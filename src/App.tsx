import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./pages/login";
import SignUpPage from "./pages/sign-up";
import DashboardPage from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogInPage />,
  },

  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    element: <DashboardPage />,
    path: "/dashboard",
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
