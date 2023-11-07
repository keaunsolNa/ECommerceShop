import {
  SearchOutlined,
  CameraOutlined,
  FileTextOutlined,
  TableOutlined,
  FormOutlined,
  ClusterOutlined,
  UserOutlined,
  ApartmentOutlined,
  ControlOutlined,
  AreaChartOutlined,
  SmileOutlined
} from '@ant-design/icons';

//화면 왼쪽 메뉴에서 나타나는 아이콘들을 설정해준것.
const icons = {
  SearchOutlined,
  CameraOutlined,
  FileTextOutlined,
  TableOutlined,
  FormOutlined,
  ClusterOutlined,
  UserOutlined,
  ApartmentOutlined,
  ControlOutlined,
  AreaChartOutlined,
  SmileOutlined
};

const sample = {
  id: 'sample',
  title: 'Sample',
  type: 'group',
  children: [
    {
      // 검색부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'search',
      title: '검색',
      type: 'item',
      url: '/search', // 이부분을 MainRoutes.js 파일에 있는 path 와 맞춰줘야 한다
      icon: icons.SearchOutlined
    },
    {
      // 기안지작성(폼)부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'createinvoice',
      title: '기안지 작성(폼)',
      type: 'item',
      url: '/createinvoice',
      icon: icons.FileTextOutlined
    },
    {
      // 기안지작성(테이블)부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'edittable',
      title: '기안지 작성(테이블)',
      type: 'item',
      url: '/edittable',
      icon: icons.TableOutlined
    },
    {
      // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'webpostingpage',
      title: '게시판',
      type: 'item',
      url: '/webpostingpage',
      icon: icons.FormOutlined
    },
    {
      id: 'dashboards',
      title: '대시보드',
      type: 'collapse',
      icon: icons.AreaChartOutlined,
      children: [
        {
          id: 'dashboardsbasic',
          title: '기본',
          type: 'item',
          url: '/dashboards/basic',
          breadcrumbs: false
        }
      ]
    },
    {
      // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'hrinfo',
      title: '인사',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
          id: 'hrinfobasic',
          title: '인사기본사항',
          type: 'item',
          url: '/hrinfo/basic',
          breadcrumbs: false
        }
      ]
    },
    {
      // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'organizationinfo',
      title: '조직',
      type: 'collapse',
      icon: icons.ApartmentOutlined,
      children: [
        {
          id: 'organizationinfobasic',
          title: '조직정보관리',
          type: 'item',
          url: '/organizationinfo/basic',
          breadcrumbs: false
        },
        {
          id: 'organizationinfoMember',
          title: '조직원조회',
          type: 'item',
          url: '/organizationinfo/member',
          breadcrumbs: false
        }
      ]
    },
    {
      // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'standard',
      title: '기준관리',
      type: 'collapse',
      icon: icons.ControlOutlined,
      children: [
        {
          id: 'WorkStandard',
          title: '업무기준관리',
          type: 'item',
          url: '/standard/work',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'vacation',
      title: '휴가신청',
      type: 'item',
      url: '/vacation',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'unittask',
      title: '단위업무관리',
      type: 'item',
      url: '/frmbizunittable',
      icon: icons.ClusterOutlined
    },
    {
      id: 'componenttest',
      title: '컴포넌트 테스트 화면',
      type: 'item',
      url: '/componenttest',
      icon: icons.SmileOutlined
    }
  ]
};

export default sample;
