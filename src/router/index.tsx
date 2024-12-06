import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import SignIn from '../views/Signin';
import Protected from './protected';
import SignUp from '../views/Signup';
import Home from '../views/Home';
import Form from '../views/Form';
import Settings from '../views/Settings';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Protected />}>
                <Route index element={<Home />} />
                <Route path='settings' element={<Settings />} />
                <Route path='new/:type' element={<Form />} />
                <Route path=':type/:id' element={<Form />} />
            </Route>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
        </Route>,
    ),
);

export default function Router() {
    return <RouterProvider router={router} />;
}
