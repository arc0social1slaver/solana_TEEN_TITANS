import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Background from "../assets/images/4.jpg";

const ExpImp = () => {
    return <div style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }}>
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
            <p><b>Exporter</b></p>
            <form action="/submit" method="post" className="items-center">
                <div className="form-group" style={{
                    display: "flex",
                    justifyContent: 'space-between',
                     }}>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" style={{width: '205%'}} id="fullName" name="fullNameExporter" required />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phoneExporter" required />
                </div>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="emailExporter" required/>
        </div>
        <p><b>Receiver</b></p>
        <div className="form-group" style={{
                    display: "flex",
                    justifyContent: 'space-between',
                     }}>
            <div>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" style={{width: "205%"}} id="fullName" name="fullNameReceiver" required />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phoneReceiver" required />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="emailReceiver" required />
        </div>
        <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="addressReceiver" required />
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
            <label htmlFor="departurePort">Departure Port:</label>
            <input type="text" id="departurePort" name="departurePort" required />
        </div>
        <div className="form-group">
            <label htmlFor="destinationPort">Destination Port:</label>
            <input type="text" id="destinationPort" name="destinationPort" required />
        </div>
        <div className="form-group">
            <label htmlFor="departureDate">Departure Date:</label>
            <input type="date" id="departureDate" name="departureDate" required />
        </div>
        <div className="form-group">
            <label htmlFor="arrivalDate">Estimated Arrival Date:</label>
            <input type="date" id="arrivalDate" name="arrivalDate" required />
        </div>
        <div className="form-group">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea id="comments" name="comments" rows={4}></textarea>
        </div>
        <button type="submit">Submit Application</button>
    </form >
        </div >
    </div>
}
export default ExpImp;