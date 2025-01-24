import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Search from "./Components/Search";
import Login from "./Components/loginpage/Login";
import Signup from "./Components/signupPage/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotprotectedRoute from "./Components/NotprotectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NotprotectedRoute>
        <Login />
      </NotprotectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <NotprotectedRoute>
        <Signup />
      </NotprotectedRoute>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
