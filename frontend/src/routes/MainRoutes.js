import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ComponentTest from 'components/test/ComponentTest';

// Sample page
const Search = Loadable(lazy(() => import('pages/search/Search')));
// const WebcamPage = Loadable(lazy(() => import('pages/webcam/WebcamPage')));
const CreateInvoice = Loadable(lazy(() => import('pages/invoice/CreateInvoice')));
const EditorPage = Loadable(lazy(() => import('pages/edit-page/EditorPage')));
const PostPage = Loadable(lazy(() => import('pages/posting-page/PostPage')));
const WritePostPage = Loadable(lazy(() => import('pages/posting-page/WritePostPage')));
const ViewPosting = Loadable(lazy(() => import('pages/posting-page/ViewPosting')));
const UpdatePostPage = Loadable(lazy(() => import('pages/posting-page/UpdatePostPage')));
const FrmBizUnitTable = Loadable(lazy(() => import('pages/extra-pages/FrmBizUnitTable')));
const HrInfo = Loadable(lazy(() => import('pages/extra-pages/hrinfo/HrInfo')));
const DashboardsBasic = Loadable(lazy(() => import('pages/extra-pages/dashboards/DashboardsBasic')));
const OrganizationInfo = Loadable(lazy(() => import('pages/extra-pages/organizationinfo/OrganizationInfo')));
const OrganizationMember = Loadable(lazy(() => import('pages/extra-pages/organizationinfo/OrganizationMember')));
const OrganizationInfoBasic = Loadable(lazy(() => import('sections/extra-pages/organizationinfo/OrganizationInfoBasic')));
const OrganizationInfoHistory = Loadable(lazy(() => import('sections/extra-pages/organizationinfo/OrganizationInfoHistory')));
const OrganizationInfoAddressChange = Loadable(lazy(() => import('sections/extra-pages/organizationinfo/OrganizationInfoAddressChange')));
const HrInfoBasic = Loadable(lazy(() => import('sections/extra-pages/hrinfo/HrInfoBasic')));
const HrInfoFamily = Loadable(lazy(() => import('sections/extra-pages/hrinfo/HrInfoFamily')));
const WorkStandard = Loadable(lazy(() => import('pages/extra-pages/systeminfo/WorkStandard')));

// pages routing
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
          path: 'search',
          element: <Search /> // src -> pages -> search -> Search.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'createinvoice',
          element: <CreateInvoice /> // src -> pages -> invoice -> CreateInvoice.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'edittable',
          element: <EditorPage /> // src -> pages -> edit-page -> EditorPage.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'webpostingpage',
          element: <PostPage /> // src -> pages -> posting-page -> PostPage.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'write',
          element: <WritePostPage /> // src -> pages -> posting-page -> WritePostPage.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'viewposting',
          element: <ViewPosting /> // src -> pages -> posting-page -> ViewPosting.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'updateposting',
          element: <UpdatePostPage /> // src -> pages -> posting-page -> ViewPosting.js 파일을 확인해보면 자세히 알수있다.
        },
        {
          path: 'dashboards',
          children: [
            {
              path: 'basic',
              element: <DashboardsBasic />
            }
          ]
        },
        {
          path: 'hrinfo',
          element: <HrInfo />,
          children: [
            {
              path: 'basic',
              element: <HrInfoBasic />
            },
            {
              path: 'family',
              element: <HrInfoFamily />
            }
          ]
        },
        {
          path: 'organizationinfo',
          children: [
            {
              path: '',
              element: <OrganizationInfo />,
              children: [
                {
                  path: 'basic',
                  element: <OrganizationInfoBasic />
                },
                {
                  path: 'history',
                  element: <OrganizationInfoHistory />
                },
                {
                  path: 'addresschange',
                  element: <OrganizationInfoAddressChange />
                }
              ]
            },
            {
              path: 'member',
              element: <OrganizationMember />
            }
          ]
        },
        {
          path: 'standard',
          children: [
            {
              path: 'work',
              element: <WorkStandard />
            }
          ]
        },
        {
          path: 'frmbizunittable',
          element: <FrmBizUnitTable />
        },
        {
          path: 'componenttest',
          element: <ComponentTest />
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
