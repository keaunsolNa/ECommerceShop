import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import SettingRoutes from './SettingRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  // LoginRoutes는 로그인에 관련된 js화면 페이지들을 모아놓은 라우터들이다. LoginRoutes.js 에서 확인 가능하다
  // MainRoutes는 메인 화면에 비춰지는 모든 js화면 페이지들을 모아놓은 라우터들이다. MainRoutes.js 에서 확인 가능하다
  return useRoutes([LoginRoutes, MainRoutes, SettingRoutes]);
}
