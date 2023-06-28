import "./App.css";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Rigister from "./pages/Rigister";
import Login from "./pages/Login";
import { AuthContext } from "../src/helpers/AuthContext"
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({username : "" ,id:0 , status : false});
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accesstoken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(
            {...authState , status:false}
          );
        } else {
          setAuthState({username : response.data.username , id :response.data.id  , status:true});
        }
      });
  }, []);
  const logout = ()=> {
    localStorage.removeItem("accesstoken")
    setAuthState({username: "", id: 0, status: false })
  }
  const LayOut = () => {
  return (
      <>
        <div className="navbar">
          <div className="linksk">
            <Link>Home page</Link>
            {
              !authState.status? (
                <>
                  <Link to="/rigister">register</Link>
                  <Link to="/login">login</Link>
                </>

              ):(
                <>
                   <button onClick={logout}>log out</button>
                   
                </>
              )
            }
                <>{authState.username}</>
          </div>
          
        </div>
        <Outlet />
      </>
    )
  }
  const browserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/createpost",
          element: <CreatePost />
        },
        {
          path: "/post/:id",
          element: <Post />
        },
        {
          path: "/rigister",
          element: <Rigister />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path:"/profile/:id",
          element: <Profile/>
        },
        {
          path:"/changepassword",
          element: <ChangePassword/>
        }
      ]
    }

  ])
  return (
    <div>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <RouterProvider router={browserRoutes} />
      </AuthContext.Provider>

    </div>

  );

}

export default App;