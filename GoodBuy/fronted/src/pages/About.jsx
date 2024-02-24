import Layout from '../components/Layout';

const About = () => {
    return <>
        <Layout title="About">
            <section id="about">
                <div className="about_box">
                    <h1>ABOUT US</h1>
                </div>

                <div className="about_content">
                    <h2>About GoodBuy</h2>
                    <p>At GoodBuy, we are passionate about delivering an exceptional online shopping experience to our valued customers. With a wide selection of top-quality products and a commitment to outstanding customer service, we aim to be your go-to destination for all your shopping needs. Our journey began with a simple vision – to create an ecommerce platform that offers convenience, reliability, and a touch of personalization. As a team of dedicated professionals, we continuously strive to curate a diverse range of products that cater to various interests and preferences</p>
                    <p>What sets us apart is our unwavering dedication to ensuring customer satisfaction. Our user-friendly website is designed to make your shopping journey seamless, from browsing through products to completing your purchase securely. We value your trust, and that's why we prioritize data security and privacy to safeguard your information. At Online Shop, we believe that every interaction matters. Our friendly and knowledgeable customer support team is always ready to assist you with any inquiries or concerns. We take pride in building lasting relationships with our customers, ensuring that your satisfaction is at the heart of everything we do.
                    </p>
                </div>

                <div className="about_cards">
                    <div className="card">
                        <h1>10K</h1>
                        <h2>Happy Customers</h2>
                        <p>Our customers are our priority, we make sure that they are satisfied with our services</p>
                    </div>
                    <div className="card">
                        <h1>5K</h1>
                        <h2>Products Avialable</h2>
                        <p>we have a wide range of products; from fashion items to electronic devices, you </p>
                    </div>
                </div>
            </section>
        </Layout>
    </>
};

export default About;