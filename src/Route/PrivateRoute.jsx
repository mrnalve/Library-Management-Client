import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        <progress className="progress w-56 mt-5"></progress>
    }
    if (user?.displayName === 'arfatul1412') {
        return children
    }
    return <Navigate to={'/'} state={{ from: location }}></Navigate>
};

export default PrivateRoute;