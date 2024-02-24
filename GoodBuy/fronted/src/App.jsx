import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Private from './routes/Private';
import AdminRoute from './routes/AdminRoute';
import Dashboard from "./pages/user/Dashboard";
import UpdateProfile from "./pages/user/UpdateProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import Users from "./pages/admin/Users";


const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:slug" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<Search />} />

      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<UpdateProfile />} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/add-product" element={<AddProduct />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/users" element={<Users />} />
      </Route>


    </Routes>
  </>
};

export default App;