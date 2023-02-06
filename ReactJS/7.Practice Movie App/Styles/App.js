import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";


const router = createBrowserRouter([
  {
  path: "/",
  element: <Home></Home>,
  },
  {
  path: "/movie/:id",
  element: <Detail></Detail>,
  },
  ]);


function App() {
    return <RouterProvider router={router} />;
  }
  
export default App;
