import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import { useState } from "react";
import Widget from "../../components/Widget";
import Charts from "../../components/Charts";

const AdminDashboard = () => {

    const [toogleMenu, setToogleMenu] = useState(false);

    return <>
        <section className="admin_dashboard_container">
            <Sidebar toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
            <div className="dashboard_content">
                <AdminHeader toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
                <Widget />
                <Charts />
            </div>
        </section>
    </>
};

export default AdminDashboard;