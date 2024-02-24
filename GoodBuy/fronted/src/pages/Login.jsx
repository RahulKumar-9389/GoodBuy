import { useState } from 'react';
import Layout from '../components/Layout';
import { BiLogInCircle } from "react-icons/bi";
import { LuShoppingBasket } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // submit user details
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/login',
                {
                    email,
                    password
                })
            if (data && data.success) {
                dispatch(login({
                    user: data.user,
                    token: data.token
                }))
                alert('Login successfully!')
                navigate('/')
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <Layout title="Login">
            <section className='form_container'>

                <div className="form_content">
                    <div className="logo">
                        <span><LuShoppingBasket className="logo_icon" /></span>
                        <h2>GoodBuy</h2>
                    </div>
                    <p>Online Shop is the best online shopping store.</p>
                    <p>We have a wide range of products; from</p>
                    <p>fashion items to electronic devices. start</p>
                    <p>shopping now!</p>
                    <button onClick={() => navigate('/register')}>SIGN UP</button>
                </div>

                <form method="post" onSubmit={handleSubmit}>

                    <div className="form_heading">
                        <h1>Welcome Back</h1>
                        <p>Welcome back please login to your account!</p>
                    </div>


                    <input
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">LOGIN <BiLogInCircle className='login_icon' /></button>

                </form>

            </section>
        </Layout>
    </>
};

export default Login;