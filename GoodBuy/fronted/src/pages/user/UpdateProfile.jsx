import { MdOutlineAttachMoney } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import Layout from '../../components/Layout'
import { useEffect, useState } from "react";
import { login, logout } from '../../redux/authSlice';
import axios from "axios";

const UpdateProfile = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)


    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
        setAddress(user.address)
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/update-profile/${user.id}`,
                {
                    name,
                    email,
                    password,
                    address
                },
                { headers: { 'Authorization': token } })
            if (data.success) {
                dispatch(login({
                    user: data?.user,
                    token: token
                }))
                alert("Profile Updated Successfully");
                navigate('/dashboard/user')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // handle logout 
    const handleLogout = () => {
        const confirm = window.confirm("You will be logout.")
        if (confirm) {
            dispatch(logout())
            navigate('/dashboard/login')
        }
        else {
            return
        }
    }

    return <>
        <Layout title='Profile'>
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

                <div className="update_profile_container">
                    <form method="post" onSubmit={handleSubmit}>

                        <div className="form_heading">
                            <h1>Update Profile</h1>
                            <p>Please fill in the form below to update your profile!</p>
                        </div>

                        <input
                            type="text"
                            placeholder='Username'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button type="submit">UPDATE <BiLogInCircle className='login_icon' /></button>

                    </form>
                </div>

            </section>
        </Layout>
    </>
};

export default UpdateProfile;