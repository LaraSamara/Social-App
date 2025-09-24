import { useContext } from "react";
import { tokenContext } from '../../Context/TokenContext.jsx';
import { Navigate } from "react-router-dom";

const GuardRoute = ({ children }) => {
    const { token } = useContext(tokenContext);

    if (token) {
        return children;
    }

    return <Navigate to="/login"></Navigate>;
}

export default GuardRoute;
