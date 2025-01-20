import './App.css';
import Home from './Components/Home';
import { createBrowserRouter } from 'react-router';
import About from './Components/About';
import { RouterProvider } from 'react-router-dom';
import Search from './Components/Search';
import Navbar from './Components/Navbar';


const router = createBrowserRouter([
  {path:'/',
    element:<Home/>
  },
  {path:"/movie/:id",
    element:<About/>
  },
  {
    path:"/search",element:<Search/>
  }
])

function App() {
  return (
  <>
  <div>
    
    <RouterProvider router={router} />
   </div>
   </>
  );
}

export default App;
