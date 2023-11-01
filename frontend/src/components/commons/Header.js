import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import { resetLoginUser } from "../../modules/UserModule";
function Header() {
    
    // const loginStatus = !!localStorage.getItem('isLogin');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const logoutHandler = () => {
    //     localStorage.removeItem('isLogin');
    //     // dispatch(resetLoginUser());
    //     navigate('/');
    // }

    return (
        <>
            <h1>E-Commerce Shop</h1>
                {/*{ !loginStatus ? (*/}
                <NavLink to='/login'>로그인</NavLink>
                    {/*) : (*/}
                    {/*    <h5 onClick={ logoutHandler }><a href="">로그아웃</a></h5>*/}
                    {/*)*/}
                {/*}*/}

            <div className='Nav'>
                <NavLink to='/menu'>전체 메뉴</NavLink>
                <NavLink to='/'>나만의 메뉴</NavLink>
                <NavLink to='/'>홀 케이크 예약</NavLink>
            </div>
        </>
    );
}

export default Header;