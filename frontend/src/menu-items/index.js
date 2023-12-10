// project import
import employeePage from './employeePage';
import productPage from './productPage';
import supplyPage from './supplyPage';

// ==============================|| MENU ITEMS ||============================== //

//화면 왼쪽에 나타나는 메뉴아이템들을 설정해주는 곳이다. 현재는 employeePage.js 라는 파일 하나만 사용하고 있다. sample.js에서 확인 가능하다.
const menuItems = {
  items: [employeePage, productPage, supplyPage]
};

export default menuItems;
