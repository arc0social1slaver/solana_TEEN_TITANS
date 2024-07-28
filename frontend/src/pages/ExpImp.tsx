import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Background from "../assets/images/4.jpg";

const ExpImp = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <nav className="bg-gradient-to-r from-gray-500 to-blue-500 flex ">
                <div className="flex justify-between items-center">
                    <img src={Logo} className="mr-2" />
                    <NavLink to={"/homePage"} className="text-white hover:text-gray-200 space-x-16">Home</NavLink>
                    <NavLink to={"#"} className="text-white hover:text-gray-200 space-x-32">Services</NavLink>
                    <NavLink to={"#"} className="text-white hover:text-gray-200 space-x-32 p-4">About us</NavLink>
                </div>
            </nav>

            <div className="containers">
                <h2><b>Sea Exportation Application Form</b></h2>
                <form action="http://localhost:5000/submit" method="post" className="items-center">
                    <div className="form-group" style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div>
                            <label htmlFor="fullName">Exporter's name:</label>
                            <input type="text" style={{ width: '310%' }} id="fullName" name="fullNameExporter" required />
                        </div>
                    </div>

                    <div className="form-group" style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div>
                            <label htmlFor="fullName">Recipient's name:</label>
                            <input type="text" style={{ width: "310%" }} id="fullName" name="fullNameReceiver" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="goodsName">Name of the goods:</label>
                        <input type="text" id="goodsName" name="goodsName" required />
                    </div>
                    <div className="flex flex-row items-center justifly-center">
                        <div className="form-group flex-col mr-10">
                            <label htmlFor="timeReceive">Time to receive:</label>
                            <input type="date" style={{ width: "160%" }} id="timeReceive" name="timeReceive" required />
                        </div>
                        <div className="form-group flex-col ml-20">
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" style={{ width: "70%" }} id="quantity" name="quantity" required />
                        </div>
                        <div className="form-group flex-col ml-">
                            <label htmlFor="quanlity" >Quanlity:</label>
                            <input type="text" style={{ width: "100%" }} id="quanlity" name="quanlity" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shipmentType">Shipment Type:</label>
                        <select id="shipmentType" name="shipmentType" required>
                            <option disabled value="">Select Shipment Type</option>
                            <option value="container">Container</option>
                            <option value="bulk">Bulk</option>
                            <option value="breakBulk">Break Bulk</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="origin">Origin:</label>
                        <input type="text" id="origin" name="origin" required />
                    </div>
                    <div className="flex flex-row items-center justifly-center">
                        <div className="form-group mr-20">
                            <label htmlFor="ISOcode">ISO code:</label>
                            <input type="text" style={{ width: "200%" }} id="ISOcode" name="ISOcode" required />
                        </div>
                        <div className="form-group flex flex-row justify-center p-4 ">
                            <label htmlFor="formCO" className="mr-2">Form CO:</label>
                            <input type="checkbox" id="formCO" name="formCO"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Additional Comments:</label>
                        <textarea id="comments" name="comments" rows={4}></textarea>
                    </div>
                    <button type="submit">Submit Application</button>
                </form >
            </div >
        </div>
    );
};
export default ExpImp;
