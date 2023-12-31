import { lazy } from 'react';
// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
// pages routing
// Employee
const EmployeeSelf = Loadable(lazy(() => import('pages/employee/EmployeeSelf')));
const EmployeeList = Loadable(lazy(() => import('pages/employee/EmployeeList')));
const MemberList = Loadable(lazy(() => import('pages/employee/MemberList')));
// Product
const ProductManagement = Loadable(lazy(() => import('pages/product/ProductManagement')));
const AmountManagement = Loadable(lazy(() => import('pages/product/AmountManagement')));
// Supply
const SupplyManagement = Loadable(lazy(() => import('pages/supply/SupplyManagement')));
// Maintenance
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// ==============================|| MAIN ROUTING ||============================== //

//라우트들의 url path(경로) 와 해당 경로로 접속했을떄 보여줄 js 화면들을 지정해준다.
//여기서 지정해줬다고 왼쪽 메뉴에는 해당 화면으로 이동할수있게해주는 무언가가 나타나지는 않는다. 그래서 src -> menu-items -> index.js 에서 이 라우터에 맞게 설정, 추가해주어야한다.
const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'employee',
          children: [
            {
              path: 'self',
              element: <EmployeeSelf />
            },
            {
              path: 'list',
              element: <EmployeeList />
            },
            {
              path: 'member',
              element: <MemberList />
            }
          ]
        },
        {
          path: 'product',
          children: [
            {
              path: 'productManagement',
              element: <ProductManagement />
            },
            {
              path: 'amountManagement',
              element: <AmountManagement />
            }
          ]
        },
        {
          path: 'supply',
          children: [
            {
              path: 'supplyManagement',
              element: <SupplyManagement />
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
