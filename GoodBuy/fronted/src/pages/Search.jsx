import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { BsCollection } from "react-icons/bs";

const Search = () => {

    const products = useSelector((state) => state.search)
    const navigate = useNavigate();

    return <>
        <Layout title='Search results'>
            <section id="search_page">
                {
                    products.result.length ?
                        <>
                            <div className="search_heading">
                                <BsCollection className="search_product_icon" />
                                <h1>{products.result.length} products found!</h1>
                            </div>
                            <hr />
                            <section className="products_container">
                                {
                                    products.result.map((p, i) => {
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
                        </>
                        :
                        <>
                            <section className="no_product_found">
                                <h1>No product found with this keyword!</h1>
                            </section>
                        </>
                }
            </section>
        </Layout>
    </>
};

export default Search;