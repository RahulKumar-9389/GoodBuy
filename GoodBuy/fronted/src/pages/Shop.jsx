import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Loader from '../components/Loading';
import { LuListFilter } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [activeCat, setActiveCat] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    // GET PRODUCTS
    const getProducts = async () => {
        try {
            setError(false)
            setLoading(true)
            const { data } = await axios.get("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/get-all-products");
            if (data && data.success) {
                setProducts(data.products)
                setData(data.products)
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





    // GET CATEGORIES
    const items = data.map((p) => p.category);
    const categories = [...new Set(items)];


    const filterCategory = (c) => {
        const filterProducts = data.filter((p) => p.category === c);
        setProducts(filterProducts)
    }


    if (error) {
        return <>
            <Layout title="Shop">
                <section id="error">
                    <h1>Something went wrong!</h1>
                </section>
            </Layout>
        </>
    }

    if (loading) {
        return <>
            <Layout title="Shop">
                <section id="loading">
                    <Loader />
                </section>
            </Layout>
        </>
    }


    return <>
        <Layout title="Shop">

            <div className="mobile_filter">
                <span><LuListFilter className='filter_icon' onClick={() => setShowFilter(!showFilter)} /></span>
                <ul className='dropdown_list' style={{ display: showFilter ? 'flex' : 'none' }}>
                    {
                        categories.map((cat, i) => {
                            return <li
                                key={i}
                                onClick={() => setActiveCat(cat) || filterCategory(cat)}
                                className={activeCat === cat ? 'active_cat' : ''}
                            >{cat}</li>
                        })
                    }
                    <button onClick={() => window.location.reload()}>Clear Filter</button>
                </ul>
            </div>

            <section id="shop">

                <section className="filter_container">
                    <h2>Categories</h2>
                    {
                        categories.map((cat, i) => {
                            return <p
                                key={i}
                                onClick={() => setActiveCat(cat) || filterCategory(cat)}
                                className={activeCat === cat ? 'active_cat' : ''}
                            >{cat}</p>
                        })
                    }
                    <button onClick={() => window.location.reload()}>Clear Filter</button>
                </section>

                <section className="products_container">
                    {
                        products.map((p, i) => {
                            return <div className="product_card" key={i}>
                                <div className="img_box" onClick={() => navigate(`/product/${p.slug}`)}>
                                    <img src={`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                </div>
                                <p>{p.name}</p>
                                <h3>₹ {p.price}</h3>
                            </div>
                        })
                    }
                </section>

            </section>

        </Layout>
    </>
};

export default Shop;