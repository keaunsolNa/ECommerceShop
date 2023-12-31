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
  title: '',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: '인사',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'employee-self',
          title: '인사기본사항',
          type: 'item',
          url: '/employee/self',
          breadcrumbs: false
        },
        {
          id: 'employee-list',
          title: '관리자 계정 목록 조회',
          type: 'item',
          url: '/employee/list',
          breadcrumbs: false
        },
        {
          id: 'employee-member',
          title: '회원 목록 조회',
          type: 'item',
          url: '/employee/member',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default employeePage;
