import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Error from './pages/commons/Error';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>

          <Route path="menu" >
            {/*<Route index element={ <Menus/> }/>*/}
            {/*<Route path=":id" element={ <MenuDetail/> }/>*/}
            {/*<Route path="regist" element={ <MenuRegist/> }/>*/}
            {/*<Route path="registNI" element={ <MenuRegistNI/>}/>*/}
            <Route path="modify" >
              {/*<Route path=":id" element={ <MenuModify/> }/>*/}
            </Route>
          </Route>

          {/*<Route path="login" element={ <Login/> }/>*/}

        </Route>

        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;