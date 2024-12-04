import './App.scss'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import NavBar from './components/NavBar/NavBar'
import LeftNav from './components/LeftNav/LeftNav'
import RightNav from './components/RightNav/RightNav'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import './style.scss';
import { useDispatch, useSelector } from "react-redux";
import Error from './Pages/Error/Error'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import CreateGroup from './components/CreateGroup/CreateGroup'
import DisplayGroup from './components/DisplayGroup/DisplayGroup'
import Files from './Pages/Files/Files'
import DisplayPeopleGr from './components/DisplayPeopleGr/DisplayPeopleGr'
import GroupsInvite from './Pages/GroupsInvite/GroupsInvite'
import Invitiation from './Pages/Invitiation/Invitiation';
import PFile from './Pages/PFile/PFile'
import BackFile from './Pages/BackFile/BackFile'


function App() {
  const user = useSelector((state) => state.authReducer.authData)
  const { darkMode } = useContext(DarkModeContext);


  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex", }} className='hh'>
          {/* <LeftNav /> */}
          <div style={{ flex: 5 }} className="content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <Error />,

        },
        {
          path: "/createGroup",
          element: <CreateGroup />,
          errorElement: <Error />,

        },
        {
          path: "/displayMyGroup",
          element: <DisplayGroup
            type="2" />,
          errorElement: <Error />,

        },
        {
          path: "/displayGroup",
          element: <DisplayGroup
            type="1" />,
          errorElement: <Error />,

        },
        {
          path: "/groups/:id",
          element: <Files />,
          errorElement: <Error />,

        },
        {
          path: "/pendingFile/:id",
          element: <PFile />,
          errorElement: <Error />,
        },
        {
          path: "/BackFile/:id",
          element: <BackFile />,
          errorElement: <Error />,
        },
        {
          path: "/groupsPoeple/:id",
          element: <DisplayPeopleGr />,
          errorElement: <Error />,
        },
        {
          path: "/groupsInvite/:id",
          element: <GroupsInvite />,
          errorElement: <Error />,
        },
        {
          path: "/invitiation",
          element: <Invitiation />,
          errorElement: <Error />,
        },

      ],
    },

    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },



  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
