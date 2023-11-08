import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import axios from 'axios';
import axiosServices from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axiosServices.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axiosServices.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // const [tokenData, setTokenData] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const decoded = jwtDecode(serviceToken);
          // const response = await axiosServices.get('/api/account/me');
          // const { user } = response.data;
          const user = {
            id: decoded.jti,
            email: decoded.email,
            name: decoded.name
          };
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  // useEffect(() => {
  //   // console.log('tokenData is22222222222 : ', tokenData);
  // }, [tokenData]);

  const login = async (email, password) => {
    console.log('login')
    // const response = await axiosServices.post('/api/login', { email, password });
    const response = await axios.post('/api/login', { email, password });
    console.log(response)
    const { serviceToken, user } = response.data;

    setSession(serviceToken);

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const kakaoLogin = async (serviceToken) => {
    setSession(serviceToken);
    try {
      const decoded = jwtDecode(serviceToken);
      // setTokenData(decoded);
      console.log('JWT 토큰 디코딩한 결과 : ', decoded);
      const user = {
        id: decoded.jti,
        email: decoded.email,
        name: decoded.name
      };
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user
        }
      });
    } catch (err) {
      // console.log(err);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    // console.log('email is : ', email, 'password : ', password, 'firstName is : ', firstName, 'lastName is : ', lastName);
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = axios
      .post('/kakaologin/account/register', {
        id: id,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = async () => {
    // console.log('tokenData is : ', tokenData.access_token);

    const serviceToken = window.localStorage.getItem('serviceToken');
    const decoded = jwtDecode(serviceToken);
    if (decoded.access_token) {
      axios.post(`/kakaologin/account/kakaounlink?kakaoAccessToken=${decoded.access_token}`).then((res) => {
        console.log(res.data);
      });
      setSession(null);
      dispatch({ type: LOGOUT });
    } else {
      setSession(null);
      dispatch({ type: LOGOUT });
    }
  };

  const resetPassword = async () => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, kakaoLogin }}>
      {children}
    </JWTContext.Provider>
  );
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
