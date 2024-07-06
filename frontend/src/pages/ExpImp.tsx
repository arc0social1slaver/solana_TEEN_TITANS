import { useState, ChangeEvent, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Background from '../assets/images/4.jpg';

const ExpImp = () => {
    const [formData, setFormData] = useState({
        fullNameExporter: '',
        fullNameReceiver: '',
        goodsName: '',
        timeReceive: '',
        quantity: '',
        quanlity: '',
        shipmentType: '',
        origin: '',
        ISOcode: '',
        fromCO: false,
        comments: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked; // Type assertion here
            setFormData((prevData) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form data saved to form-data.json');
            } else {
                alert('Error saving form data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving form data');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <nav className="bg-gradient-to-r from-gray-500 to-blue-500 flex">
                <div className="flex justify-between items-center">
                    <img src={Logo} className="mr-2" alt="Logo" />
                    <NavLink to="/homePage" className="text-white hover:text-gray-200 space-x-16">
                        Home
                    </NavLink>
                    <NavLink to="#" className="text-white hover:text-gray-200 space-x-32">
                        Services
                    </NavLink>
                    <NavLink to="#" className="text-white hover:text-gray-200 space-x-32 p-4">
                        About us
                    </NavLink>
                </div>
            </nav>

            <div className="containers">
                <h2>
                    <b>Sea Exportation Application Form</b>
                </h2>
                <form onSubmit={handleSubmit} className="items-center">
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <label htmlFor="fullNameExporter">Exporter's name:</label>
                            <input
                                type="text"
                                style={{ width: '310%' }}
                                id="fullNameExporter"
                                name="fullNameExporter"
                                value={formData.fullNameExporter}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <label htmlFor="fullNameReceiver">Recipient's name:</label>
                            <input
                                type="text"
                                style={{ width: '310%' }}
                                id="fullNameReceiver"
                                name="fullNameReceiver"
                                value={formData.fullNameReceiver}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="goodsName">Name of the goods:</label>
                        <input
                            type="text"
                            id="goodsName"
                            name="goodsName"
                            value={formData.goodsName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <div className="form-group flex-col mr-10">
                            <label htmlFor="timeReceive">Time to receive:</label>
                            <input
                                type="date"
                                style={{ width: '160%' }}
                                id="timeReceive"
                                name="timeReceive"
                                value={formData.timeReceive}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group flex-col ml-20">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="text"
                                style={{ width: '70%' }}
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group flex-col ml-2">
                            <label htmlFor="quanlity">Quantity:</label>
                            <input
                                type="text"
                                style={{ width: '100%' }}
                                id="quanlity"
                                name="quanlity"
                                value={formData.quanlity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shipmentType">Shipment Type:</label>
                        <select
                            id="shipmentType"
                            name="shipmentType"
                            value={formData.shipmentType}
                            onChange={handleChange}
                            required
                        >
                            <option disabled value="">
                                Select Shipment Type
                            </option>
                            <option value="container">Container</option>
                            <option value="bulk">Bulk</option>
                            <option value="breakBulk">Break Bulk</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="origin">Origin:</label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <div className="form-group mr-20">
                            <label htmlFor="ISOcode">ISO code:</label>
                            <input
                                type="text"
                                style={{ width: '200%' }}
                                id="ISOcode"
                                name="ISOcode"
                                value={formData.ISOcode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group flex flex-row justify-center p-4">
                            <label htmlFor="fromCO" className="mr-2">
                                Form CO:
                            </label>
                            <input
                                type="checkbox"
                                id="fromCO"
                                name="fromCO"
                                checked={formData.fromCO}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Additional Comments:</label>
                        <textarea
                            id="comments"
                            name="comments"
                            rows={4}
                            value={formData.comments}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        </div>
    );
};

export default ExpImp;
