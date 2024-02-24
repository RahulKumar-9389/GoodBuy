import { GoArrowUp } from "react-icons/go";


const Widget = () => {


    return <>
        <section className="widget_container">

            <div className="widget">
                <h3>Weekly Sales</h3>
                <h1>₹ 15,000</h1>
                <p>Increased by 60% <GoArrowUp className="widget_icon" /></p>
            </div>
            <div className="widget">
                <h3>Weekly Orders</h3>
                <h1>65, 6334</h1>
                <p>Increased by 10% <GoArrowUp className="widget_icon" /></p>
            </div>
            <div className="widget">
                <h3>Visitors Online</h3>
                <h1>95, 3215</h1>
                <p>Increased by 5% <GoArrowUp className="widget_icon" /></p>
            </div>

        </section>
    </>
};

export default Widget;