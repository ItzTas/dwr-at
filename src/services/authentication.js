import { redirect } from 'react-router-dom';

function isAuthenticated() {
    const session = localStorage.getItem('session');

    if (session) throw redirect('/');
    return null;
}

function handleVerificationProtected() {
    const session = localStorage.getItem('session');

    if (!session) throw redirect('/signin');
    return null;
}

export { isAuthenticated, handleVerificationProtected };
