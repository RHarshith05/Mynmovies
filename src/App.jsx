// import "./App.css";
// import Home from "./Components/Home";
// import { createBrowserRouter } from "react-router";
// import About from "./Components/About";
// import { RouterProvider } from "react-router-dom";
// import Search from "./Components/Search";
// import Login from "./Components/loginpage/Login";
// import Signup from "./Components/signupPage/Signup";


// const router = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   { path: "/signup", element: <Signup />},
//   { path: "/movie/:id", element: <About /> },
//   {path: "/search",element: <Search />},
//   {path: "/Home",element: <Home />},
// ]);

// function App() {
//   return (
//     <>
//       <div>
//         <RouterProvider router={router} />
//       </div>
//     </>
//   );
// }

// export default App;



import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Search from "./Components/Search";
import Login from "./Components/loginpage/Login";
import Signup from "./Components/signupPage/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/movie/:id",
    element: (
      <PrivateRoute>
        <About />
      </PrivateRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <PrivateRoute>
        <Search />
      </PrivateRoute>
    ),
  },
  {
    path: "/Home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
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
