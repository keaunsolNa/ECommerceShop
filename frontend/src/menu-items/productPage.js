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

const productPage = {
  id: 'productPage',
  title: '',
  type: 'group',
  children: [
    {
      id: 'product',
      title: '상품',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'productManagement',
          title: '상품 관리',
          type: 'item',
          url: '/product/productManagement',
          breadcrumbs: false
        },
        {
          id: 'amountManagement',
          title: '재고 관리',
          type: 'item',
          url: '/product/amountManagement',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default productPage;
