import Layout from '../components/Layout';
import { LuMail } from "react-icons/lu";
import { MdWifiCalling3 } from "react-icons/md";
import { PiMapPinLine } from "react-icons/pi";


const Contact = () => {
    return <>
        <Layout>
            <section id="contact">

                <div className="about_box">
                    <h1>Contact US</h1>
                </div>

                <div className="contact_cards">
                    <div className="card">
                        <LuMail className='contact_icon' />
                        <h2>Email Us</h2>
                        <p><span>rahulkumar.programmer@gmail.com </span>Interactively grow empowered for process-centric total linkage.</p>
                    </div>
                    <div className="card">
                        <MdWifiCalling3 className='contact_icon' />
                        <h2>Call Us</h2>
                        <p><span>+(91) 9389208280</span> Distinctively disseminate focused solutions clicks-and-mortar ministate.</p>
                    </div>
                    <div className="card">
                        <PiMapPinLine className='contact_icon' />
                        <h2>Location</h2>
                        <p>Himayupur Mawana Meerut (Uttar Pardesh), India</p>
                    </div>
                </div>

                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27889.04850854764!2d77.89928886505456!3d29.101811776308242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c762cd4197689%3A0x4b8cd548e04b2244!2sMawana%2C%20Uttar%20Pradesh%20250401!5e0!3m2!1sen!2sin!4v1708143324296!5m2!1sen!2sin"  ></iframe>
                </div>

            </section>
        </Layout>
    </>
};

export default Contact;