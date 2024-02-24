import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import AdminHeader from "../../components/AdminHeader";
import { useSelector } from "react-redux";
import Sidebar from '../../components/Sidebar';

const AdminOrders = () => {

    const [toogleMenu, setToogleMenu] = useState(false);

    const [status,] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancel",
    ]);
    const [orders, setOrders] = useState([]);
    const auth = useSelector((state) => state.auth)


    //  GET ALL ORDERS 
    const getOrders = async () => {
        try {
            const { data } = await axios.get("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/all-orders",
                { headers: { "Authorization": auth?.token } });
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);




    const handleChange = async (orderId, value) => {
        try {
            await axios.put(`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/order-status/${orderId}`, {
                status: value,
            },
                { headers: { "Authorization": auth?.token } });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <section className="admin_orders_container">
            <Sidebar toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
            <div className="admin_orders_table">
                <AdminHeader toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
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
                                return <tr key={i}>
                                    <td aria-label="No.">{i + 1}</td>
                                    <td aria-label="Status">
                                        <select
                                            bordered={false}
                                            onChange={(value) => handleChange(o._id, value)}
                                            defaultValue={o?.status}
                                        >
                                            {status.map((s, i) => (
                                                <option key={i} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
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

    </>
};

export default AdminOrders;