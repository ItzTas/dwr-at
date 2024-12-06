import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
    const session = localStorage.getItem('session');

    return session ? <Outlet /> : <Navigate to='/signin' />;
}

export default Protected;
