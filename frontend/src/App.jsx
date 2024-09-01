import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Forgot from "./pages/auth/Forgot";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./components/product/ProductDetails";
import EditProduct from "./components/product/EditProduct";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }

    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
