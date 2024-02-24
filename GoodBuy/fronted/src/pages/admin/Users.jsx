import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";


const Users = () => {

    const [toogleMenu, setToogleMenu] = useState(false);
    const [users, setUsers] = useState([]);
    const data = [
        {
            name: 'January',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'February',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'March',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'April',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'June',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const getUsers = async () => {
        try {
            const { data } = await axios.get("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/get-users")
            setUsers(data.users)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <>
        <section className="admin_dashboard_container">
            <Sidebar toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
            <div className="users_container">
                <AdminHeader toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
                <div className="user_chart_container">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="user_table">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((u, i) => {
                                    return <tr key={u.id}>
                                        <td aria-label="No.">{i + 1}</td>
                                        <td aria-label="Name">{u.name}</td>
                                        <td aria-label="Email">{u.email}</td>
                                        <td aria-label="Address">{u.address}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </>
};


export default Users;