import Sidebar from '../../components/Sidebar';
import AdminHeader from '../../components/AdminHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Products = () => {

    const [toogleMenu, setToogleMenu] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token)

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


    // DELETE PRODUCT 
    const deleteProduct = async (id) => {
        const { data } = await axios.delete(`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/delete-product/${id}`,
            { headers: { "Authorization": token } });
        if (data.success) {
            alert("Product deleted successfully!");
            window.location.reload()
        }
        else {
            alert("Something went wrong");
        }
    }


    if (error) {
        return <>
            <section className="admin_products_container">
                <Sidebar toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />

                <div className="admin_products_table">
                    <AdminHeader toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
                    <div id="error">
                        <h1>Something went wrong!</h1>
                    </div>
                </div>
            </section>
        </>
    }


    if (loading) {
        return <>
            <section className="admin_products_container">
                <Sidebar toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />

                <div className="admin_products_table">
                    <AdminHeader toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
                    <div id="loading">
                        <Loader />
                    </div>
                </div>
            </section>
        </>
    }



    return <>
        <section className="admin_products_container">
            <Sidebar toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />

            <div className="admin_products_table">
                <AdminHeader toogleMenu={toogleMenu} setToogleMenu={setToogleMenu} />
                <div>
                    <h1>Products List:</h1>
                    <button onClick={() => navigate('/dashboard/admin/add-product')}>Add Product</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p, i) => {
                                return <tr key={i}>
                                    <td aria-label='Image'>
                                        <img src={`https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                    </td>
                                    <td aria-label='Product'>{p.name}</td>
                                    <td aria-label='Price'>₹ {p.price}</td>
                                    <td aria-label='Category'>{p.category}</td>
                                    <td aria-label='Actions' onClick={() => deleteProduct(p._id)} style={{ cursor: 'pointer' }}>remove</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    </>
};

export default Products;