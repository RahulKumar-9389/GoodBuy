import { LuShoppingBasket } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { CgClose, CgMenuRight, CgSearch } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../redux/searchSlice";
import axios from "axios";

const Header = () => {

    const [mobileMenu, setMobileMenu] = useState(false);
    const [values, setValues] = useState("");
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.cart.cart)

    const handleSubmit = async () => {
        try {
            const { data } = await axios.get(
                `https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/search/${values}`
            );
            dispatch(searchProduct({
                keyword: values,
                result: data
            }))
            navigate('/search')
        } catch (error) {
            console.log(error.message);
        }
    }

    return <>
        <header id="header">

            <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <span><LuShoppingBasket className="logo_icon" /></span>
                <h2>GoodBuy</h2>
            </div>

            <div className="search_box">
                <span onClick={handleSubmit}><CgSearch className="search_icon" /></span>
                <input
                    type="text"
                    placeholder="Search.."
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                />
            </div>

            <nav className="mid_menu">
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/shop'>SHOP</Link>
            </nav>

            <div className="right_menu">
                <LuUser
                    className="right_menu_icon"
                    style={{ color: user ? '#fb5607' : '#000814' }}
                    onClick={() => navigate(user ? user.role === 1 ? '/dashboard/admin' : '/dashboard/user' : '/login')}
                />
                <div onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
                    <span>{products.length}</span>
                    <FiShoppingCart className="right_menu_icon" />
                </div>
                <CgMenuRight className="right_menu_icon menu_icon" onClick={() => setMobileMenu(true)} />
            </div>

        </header>

        {/* ========== mobile menu ============= */}
        {
            mobileMenu && <>
                <section className="mobile_menu_container">
                    <CgClose className="mobile_menu_close_icon" onClick={() => setMobileMenu(false)} />
                    <nav>
                        <Link to='/'>HOME</Link>
                        <Link to='/about'>ABOUT</Link>
                        <Link to='/shop'>SHOP</Link>
                        <Link to='/contact'>CONTACT US</Link>
                    </nav>
                </section>
            </>
        }
    </>
};

export default Header;