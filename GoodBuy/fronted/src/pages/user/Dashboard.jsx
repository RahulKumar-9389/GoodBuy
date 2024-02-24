import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAttachMoney } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { logout } from '../../redux/authSlice';

const Dashboard = () => {

    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/orders",
                { headers: { "Authorization": token } });
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) getOrders();
    }, [token]);

    const handleLogout = () => {
        const confirm = window.confirm("You will be logout.")
        if (confirm) {
            dispatch(logout())
            navigate('/login')
        }
        else {
            return
        }
    }

    return <>
        <Layout title="Dashboard">
            <section className="user_dashboard_container">

                <div className="user_menu">
                    <div className="user_profile">
                        <img src="/profile.png" alt=".." loading='lazy' height={'80px'} />
                        <p>Hi, {user.name}</p>
                    </div>
                    <div className="user_actions">
                        <Link to='/dashboard/user'>
                            <MdOutlineAttachMoney className='user_actions_icon' />Orders
                        </Link>
                        <Link to='/dashboard/user/profile'>
                            <CgProfile className='user_actions_icon' />Profile
                        </Link>
                    </div>
                    <button onClick={handleLogout} className="logout_btn"><IoMdLogOut className='logout_icon' />Logout</button>
                </div>

                <div className="user_orders_container">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Status</th>
                                <th>Buyer</th>
                                <th>Date</th>
                                <th>Payment</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((o, i) => {
                                    return <tr>
                                        <td aria-label="No">{i + 1}</td>
                                        <td aria-label="Status">{o?.status}</td>
                                        <td aria-label="Name">{o?.buyer?.name}</td>
                                        <td aria-label="Date">{moment(o?.createAt).fromNow()}</td>
                                        <td aria-label="Payment">{o?.payment.success ? "Success" : "Failed"}</td>
                                        <td aria-label="Quantity">{o?.products?.length}</td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </section>
        </Layout>
    </>
};

export default Dashboard;