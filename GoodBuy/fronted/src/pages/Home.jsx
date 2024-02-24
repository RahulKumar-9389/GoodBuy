import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import axios from 'axios';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // GET PRODUCTS
    const getProducts = async () => {
        try {
            setError(false)
            setLoading(true)
            const { data } = await axios.get("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/get-all-products");
            if (data && data.success) {
                setProducts(data.products)
                setLoading(false)
            }
            else {
                alert("Something went wrong!")
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    return <>
        <Layout title='Home'>
            <Banner />

            <section className="top_product_container">
                <div className="search_heading">
                    <MdOutlineFormatListBulleted className="search_product_icon" />
                    <h1>Top products</h1>
                </div>
                <div className="products_container">
                    {
                        products.slice(5, 11).map((p, i) => {
                            return <div className="product_card" key={i}>
                                <div className="img_box" onClick={() => navigate(`/product/${p.slug}`)}>
                                    <img src={`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                </div>
                                <p>{p.name}</p>
                                <h3>₹ {p.price}</h3>
                            </div>
                        })
                    }
                </div>
            </section>

            <section className="newsletter">
                <h1>NEWSLETTER</h1>
                <p>Subscribe to us for latest updates and best offers.</p>
                <div>
                    <input type="text" required placeholder='Email' />
                    <button>Subscribe<LuSend className='send_icon' /></button>
                </div>
            </section>

        </Layout>
    </>
};

export default Home;