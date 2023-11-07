import { lazy } from 'react';

// project import
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - setting
const Setting = Loadable(lazy(() => import('pages/setting/Setting')));
// ==============================|| AUTH ROUTING ||============================== //

const SettingRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <CommonLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'setting',
          element: <Setting />
        }
      ]
    }
  ]
};

export default SettingRoutes;
