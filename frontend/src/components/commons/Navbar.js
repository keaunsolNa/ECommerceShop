import { NavLink } from 'react-router-dom';


function Navbar() {

    return (
        <div className='Nav'>
            <ul>
                <li><NavLink to='/menu'>음료</NavLink></li>
                <li><NavLink to='/food'>푸드</NavLink></li>
                <li><NavLink to='/other'>상품</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar;