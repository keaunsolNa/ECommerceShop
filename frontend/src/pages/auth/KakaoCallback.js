import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';

const redirect_Uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

const KakaoCallback = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const [token, setToken] = useState('');

  const { kakaoLogin } = useAuth();

  useEffect(() => {
    console.log('카카오로부터 받은 인가코드 : ', code);
    axios
      .get(`/kakaologin/account/kakaoinfo?code=${code}&redirect_Uri=${redirect_Uri}`)
      .then((res) => {
        console.log('받은 인가코드 8080서버로 보낸 후 받은 response 토큰값 : ', res);
        setToken(res.data);
      })
      .catch((err) => console.log(err));
  }, [code]);

  useEffect(() => {
    try {
      kakaoLogin(token);
    } catch (err) {
      console.error(err);
    }
  }, [kakaoLogin, token]);

  return (
    <>
      <div>로그인 중입니다.</div>
    </>
  );
};

export default KakaoCallback;
