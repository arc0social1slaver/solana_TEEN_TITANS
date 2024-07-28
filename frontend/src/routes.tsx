import { createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ExpImp from "./pages/ExpImp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome/>,
        errorElement: '',
    },
    {
        path: '/Welcome',
        element: <Welcome/>,
        errorElement: '',
    },
    {
        path: '/homePage',
        element: <HomePage/>,
        errorElement: '',
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: '',
    },
    {
        path: '/signup',
        element: <SignUp/>,
        errorElement: ''
    },
    {
        path: '/exp-imp',
        element: <ExpImp/>,
        errorElement: ''
    }
]);