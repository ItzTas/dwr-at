import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import SignIn from '../views/Signin';
import Protected from './protected';
// import Home from '../views/Home';
// import Settings from '../views/Settings';
// import SignUp from '../views/Signup';
// import Form from '../views/Form';

const router = createBrowserRouter(
    // <Route index element={<Home />} />
    //     <Route path='settings' element={<Settings />} />
    //     <Route path='new/:type' element={<Form />} />
    //         <Route path=':type/:id' element={<Form />} />
    createRoutesFromElements(
        <Route path='/'>
            <Route element={<Protected />}></Route>
            <Route path='signin' element={<SignIn />} />
            {/* <Route path='signup' element={<SignUp />} /> */}
        </Route>,
    ),
);

export default function Router() {
    return <RouterProvider router={router} />;
}
