import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

export default Layout;
