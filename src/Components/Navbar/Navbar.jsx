import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { tokenContext } from '../../Context/TokenContext.jsx';

const Navbar = () => {
    const { token, setToken } = useContext(tokenContext);
    const navigate = useNavigate();

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="container mx-auto px-4 flex">
                <div className="flex-1">
                    <NavLink className="text-info text-xl">Linked Posts</NavLink>
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {token ?
                                <>
                                    <li><NavLink to="profile">Profile</NavLink></li>
                                    <li><button onClick={() => {
                                        setToken(null);
                                        localStorage.removeItem('Token');
                                        navigate('/login');
                                    }}>Logout</button></li>
                                </> :
                                <>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                </>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
