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

const supplyPage = {
  id: 'supplyPage',
  title: '',
  type: 'group',
  children: [
    {
      id: 'supply',
      title: '발주처',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'supplyManagement',
          title: '발주처 목록 관리',
          type: 'item',
          url: '/supply/supplyManagement',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default supplyPage;
