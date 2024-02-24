import { useState } from 'react';
import Layout from '../components/Layout';
import { BiLogInCircle } from "react-icons/bi";
import { LuShoppingBasket } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/auth/register",
                {
                    name,
                    email,
                    password,
                    address
                })

            if (data.success) {
                alert("Register successfully!");
                navigate('/login')
            }
            else {
                alert('Something went wrong!')
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    return <>
        <Layout title="Register">
            <section className='form_container'>

                <div className="form_content">
                    <div className="logo">
                        <span><LuShoppingBasket className="logo_icon" /></span>
                        <h2>GoodBuy</h2>
                    </div>
                    <p>Welcome back in Online Shop. We offer the</p>
                    <p>We have a wide range of products; from</p>
                    <p>What are you waiting for? Start shopping now!</p>
                    <button onClick={() => navigate('/login')}>LOGIN</button>
                </div>

                <form method="post" onSubmit={handleSubmit}>

                    <div className="form_heading">
                        <h1>Create an Account</h1>
                        <p>Please fill in the form below to create an account</p>
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

                    <button type="submit">SIGN UP <BiLogInCircle className='login_icon' /></button>

                </form>

            </section>
        </Layout>
    </>
};

export default Register;