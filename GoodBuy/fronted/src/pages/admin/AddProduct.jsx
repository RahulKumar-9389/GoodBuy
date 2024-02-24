import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token)


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = axios.post(
                "https://mern-stack-ecommerce-backend-84or.onrender.com/api/v1/product/create-product",
                productData,
                { headers: { "Authorization": token } }
            );
            if (data?.success) {
                alert(data?.message);
            } else {
                alert("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error.message);
            alert("something went wrong");
        }
    }

    return <>
        <section className="add_product_container">
            <form method="post" onSubmit={handleSubmit}>

                <div className="form_heading">
                    <h1>Add Product</h1>
                    <p>Please fill in the form below to add product!</p>
                </div>



                <div className="form_input">
                    <input
                        type="text"
                        placeholder="Productname"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form_input">
                    <input
                        type="text"
                        id="description"
                        required placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form_input">
                    <input
                        type="text"
                        id="category"
                        required
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div className="form_input">
                    <input
                        type="number"
                        id="quantity"
                        required
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <div className="form_input">
                    <input
                        type="number"
                        id="price"
                        required
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="form_input">
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        accept='image/*'
                    />
                </div>

                <button>SUBMIT</button>


            </form>
        </section>
    </>
};

export default AddProduct;