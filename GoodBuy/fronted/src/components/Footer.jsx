import { Link } from "react-router-dom";
import { LuShoppingBasket } from "react-icons/lu";


const Footer = () => {
    return <>
        <footer id="footer">

            <section className="footer">
                <div>
                    <h2>Company</h2>
                    <Link>About Us</Link>
                    <Link>Condition</Link>
                    <Link>FAQ</Link>
                    <Link>Policy</Link>
                </div>
                <div>
                    <h2>Top Category</h2>
                    <Link>Shirt</Link>
                    <Link>Tshirt</Link>
                    <Link>Footwear</Link>
                    <Link>Trouser</Link>
                </div>
            </section>

            <section className="footer">
                <div className="left">
                    <h2>My Account</h2>
                    <Link>Dashboard</Link>
                    <Link>My Orders</Link>
                    <Link>Profile</Link>
                </div>
                <div className="right">
                    <h2><span><LuShoppingBasket className="logo_icon" /></span>GoodBuy</h2>
                    <p>Himayupur Mawana Meerut (U.P), Indian</p>
                    <p>Tell : (+91) 0123456789</p>
                    <p>Email : rahulkumar.programmer@gmail.com</p>
                </div>
            </section>
        </footer>
    </>
};

export default Footer;