import { LuLayoutDashboard, LuList, LuShoppingBasket, LuUsers } from "react-icons/lu";
import { MdLogout, MdOutlineAttachMoney } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from '../redux/authSlice';

const Sidebar = ({ toogleMenu }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            const confirm = window.confirm("You will be log out!")
            if (confirm) {
                dispatch(logout())
                navigate('/login')
            }
            else {
                return
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return <>
        <aside className={toogleMenu ? 'sidebar showAdminMenu' : 'sidebar'}>

            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <span><LuShoppingBasket className="logo_icon" /></span>
                <h2>GoodBuy</h2>
            </div>

            <hr />
            <menu className="admin_menu">
                <Link to='/dashboard/admin'>
                    <LuLayoutDashboard className="admin_menu_icon" />
                    <span>Dashboard</span>
                </Link>
                <Link to='/dashboard/admin/products'>
                    <LuList className="admin_menu_icon" />
                    <span>Products</span>
                </Link>
                <Link to='/dashboard/admin/orders'>
                    <MdOutlineAttachMoney className="admin_menu_icon" />
                    <span>Orders</span>
                </Link>
                <Link to='/dashboard/admin/users'>
                    <LuUsers className="admin_menu_icon" />
                    <span>Users</span>
                </Link>
            </menu>

            <button onClick={handleLogout}>Logout <IoMdLogOut /></button>

        </aside>
    </>
};

export default Sidebar;