import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Loader from '../components/Loading';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const SingleProduct = () => {

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [productSize, setProductSize] = useState('M')
    const { slug } = useParams();
    const dispatch = useDispatch();

    const sizes = ['XL', 'L', 'M', 'S', 'XS'];
    // GET PRODUCTS
    const getProduct = async () => {
        try {
            setError(false)
            setLoading(true)
            const { data } = await axios.get(`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/get-product/${slug}`);
            if (data && data.success) {
                setProduct(data.product)
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
        getProduct();
    }, [])


    const handleAddToCart = (p) => {
        dispatch(addItem(p))
        toast.success('Product added successfully!', {
            duration: 4000,
            position: 'top-center',

            className: 'toast',

            // Aria
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    }




    if (error) {
        return <>
            <Layout title="SingleProduct">
                <section id="error">
                    <h1>Something went wrong!</h1>
                </section>
            </Layout>
        </>
    }

    if (loading) {
        return <>
            <Layout title="SingleProduct">
                <section id="loading">
                    <Loader />
                </section>
            </Layout>
        </>
    }


    return <>
        <Layout title="SingleProduct">
            <section className="single_product_container">
                <div className="product_image">
                    <img src={`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/product-photo/${product._id}`} alt={product.name} />
                </div>
                <div className="product_content">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h3>₹ {product.price}</h3>
                    <h6>Choose your size</h6>
                    <div className="product_size">
                        {
                            sizes.map((size, i) => {
                                return <span
                                    key={i}
                                    onClick={() => setProductSize(size)}
                                    className={productSize === size ? 'selected' : ''}
                                >{size}</span>
                            })
                        }
                    </div>
                    <button onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                </div>
            </section>
        </Layout>
    </>
};

export default SingleProduct;