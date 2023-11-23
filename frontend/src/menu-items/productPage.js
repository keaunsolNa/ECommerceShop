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
  title: 'productPage',
  type: 'group',
  children: [
    {
      // 게시판부를 다룬 js페이지로 이동할수있게 해주는 메뉴 버튼
      id: 'product',
      title: '상품',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'product-list',
          title: '상품 목록 조회',
          type: 'item',
          url: '/product/list',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default productPage;
