import { useContext } from 'react';

// auth provider
import AuthContext from 'contexts/JWTContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const context = useContext(AuthContext);

  console.log(context)
  if (!context) throw new Error('context must be use inside provider');


  return context;
};

export default useAuth;
