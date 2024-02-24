import { CgSearch } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../redux/searchSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Banner = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            const { data } = await axios.get(
                `https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/search/${values}`
            );
            dispatch(searchProduct({
                keyword: values,
                result: data
            }))
            navigate('/search')
        } catch (error) {
            console.log(error.message);
        }
    }

    return <>
        <section id="banner">
            <div className="banner_container">

                <h1>All the assets you need, in one place</h1>
                <p>Shop clothes, accessories, and more from independent sellers around the world.</p>

                <div className="banner_search_box">
                    <input
                        type="text"
                        placeholder="Search.."
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                    />
                    <span onClick={handleSubmit}><CgSearch className="search_icon" /></span>
                </div>

            </div>

        </section>
    </>
};

export default Banner;