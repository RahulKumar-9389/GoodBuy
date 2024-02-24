import { LuMenu } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const AdminHeader = ({ toogleMenu, setToogleMenu }) => {

    const user = useSelector((state) => state.auth.user)

    return <>
        <section className="admin_header">
            <div className="admin_toogle">
                <LuMenu className="admin_toogle_icon" onClick={() => setToogleMenu(!toogleMenu)} />
            </div>
            <div className="language">
                <MdLanguage className="language_cion" />
                <span>English</span>
            </div>

            <div className="admin_profile">
                <CgProfile className="admin_profile_icon" />
                <span>Hi, {user.name}</span>
            </div>
        </section>
    </>
};

export default AdminHeader;