import {
  ApartmentOutlined,
  AreaChartOutlined,
  CameraOutlined,
  ClusterOutlined,
  ControlOutlined,
  FileTextOutlined,
  FormOutlined,
  SearchOutlined,
  SmileOutlined,
  TableOutlined,
  UserOutlined
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

const employeePage = {
  id: 'employeePage',
  title: 'employeePage',
  type: 'group',
  children: [
    {
      // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'employee',
      title: '인사',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
          id: 'employee-self',
          title: '인사기본사항',
          type: 'item',
          url: '/employee/self',
          breadcrumbs: false
        },
        {
          // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
          id: 'employee-create',
          title: '관리자 계정 생성',
          type: 'item',
          url: '/employee/create',
          breadcrumbs: false
        },
        {
          // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
          id: 'employee-list',
          title: '관리자 계정 목록 조회',
          type: 'item',
          url: '/employee/list',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default employeePage;
