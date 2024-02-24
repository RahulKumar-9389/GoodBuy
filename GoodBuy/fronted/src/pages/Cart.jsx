import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { MdClose } from "react-icons/md";
import { removeItem, increaseItemQuantity, decreaseItemQuantity, } from '../redux/cartSlice';
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import { emptyCart } from "../redux/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {

    const auth = useSelector((state) => state.auth)
    const products = useSelector((state) => state.cart.cart);
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const totalPrice = () => {
        try {
            let total = 0;
            products.map((p) => {
                total = total + p.price
            })
            return total;
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleRemoveProduct = (id) => {
        dispatch(removeItem(id))
        toast.success('Product removed successfully!', {
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

    const dicreaseQuantity = (id) => {
        dispatch(decreaseItemQuantity(id))
    }

    const increaseQuantity = (id) => {
        dispatch(increaseItemQuantity(id))
    }


    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth.token]);


    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post("https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/braintree/payment", {
                nonce,
                products,
            }, { headers: { "Authorization": auth.token } });
            dispatch(emptyCart())
            setLoading(false);
            navigate('/dashboard/user')
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

    return <>
        <Layout title='Your-Cart'>
            {
                products.length ?
                    <>
                        <section id="cart">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((p, i) => {
                                            return <tr key={i}>
                                                <td aria-label="Image"><img src={`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} /></td>
                                                <td aria-label="Product">{p.name}</td>
                                                <td aria-label="Price">₹ {p.price}</td>
                                                <td aria-label="Quantity">
                                                    <div className="quantity">
                                                        <button
                                                            onClick={() => dicreaseQuantity(p._id)}
                                                            className={p.quantity <= 1 ? 'disable_btn' : ''}
                                                        > - </button>
                                                        <button>{p.quantity}</button>
                                                        <button
                                                            onClick={() => increaseQuantity(p._id)}
                                                            className={p.quantity >= 5 ? 'disable_btn' : ''}
                                                        > + </button>
                                                    </div>
                                                </td>
                                                <td aria-label="Total" className="total">₹ {p.price * p.quantity}</td>
                                                <td aria-label="Remove" ><MdClose onClick={() => handleRemoveProduct(p._id)} className="close_icon" /></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="chekout_container">
                                <div className="subtotal">
                                    <p>SUBTOTAL:</p>
                                    <h3>₹ {totalPrice()}</h3>
                                </div>
                                {!clientToken || !auth?.token || !products?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <button
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Chekout"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </section>
                    </>

                    :
                    <>
                        <section className="empty_cart">

                            <img src="/cart.png" alt=".." />
                            <h1>Your cart is <span>empty</span>.</h1>
                            <button onClick={() => navigate('/shop')}><CiShoppingBasket className="empty_cart_icon" />return to shop</button>

                        </section>
                    </>
            }
        </Layout>
    </>
};

export default Cart;