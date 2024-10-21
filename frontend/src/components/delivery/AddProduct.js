import React, { useState } from "react";
import axios from "axios";
import DeliveryHeader from "../delivery/DeliveryHeader";

export default function AddProduct() {
    const [productname, setproductname] = useState("");
    const [productwight, setproductwight] = useState("");
    const [buyermobile, setbuyermobile] = useState("");
    const [quantity, setquantity] = useState("");
    const [buyershomeno, setbuyershomeno] = useState("");
    const [buyerstreet, setbuyerstreet] = useState("");
    const [buyerscity, setbuyerscity] = useState("");
    const [buyersname, setbuyersname] = useState("");
    const [deliveryPersonId, setDeliveryPersonId] = useState("");
    const [error, setError] = useState("");

    // Sample arrays for Sri Lankan cities and streets
    const cities = [
        "Colombo",
        "Kandy",
        "Galle",
        "Matara",
        "Jaffna",
        "Negombo",
        "Kurunegala",
        "Batticaloa",
        "Ratnapura",
        "Anuradhapura"
    ];

    const streets = [
        "Galle Road",
        "Marine Drive",
        "Havelock Road",
        "Borella",
        "Rajagiriya",
        "Nugegoda",
        "Dehiwala",
        "Mount Lavinia",
        "Kandy Road",
        "Colombo Road"
    ];

    function validateProductName(name) {
        const regex = /^[A-Za-z][A-Za-z0-9]{0,14}$/; // Allow only letters and numbers, max 15 characters
        return regex.test(name);
    }

    function validateProductWeight(weight) {
        const regex = /^\d{1,3}(kg|g)?$/;
        return regex.test(weight);
    }

    function validateBuyerMobile(mobile) {
        const regex = /^(078|071|077|072|075|033|011)\d{7}$/;
        return regex.test(mobile);
    }

    function validateBuyersName(name) {
        const regex = /^[A-Za-z\s]+$/; // Allow only letters and spaces
        return regex.test(name);
    }

    function sendData(e) {
        e.preventDefault();

        if (!validateProductName(productname)) {
            setError("Product name must start with a letter, can only contain letters and numbers, and be a maximum of 15 characters.");
            return;
        }

        if (!validateProductWeight(productwight)) {
            setError("Product weight must be a number (1 to 3 digits) followed by 'kg' or 'g' if applicable.");
            return;
        }

        if (!validateBuyerMobile(buyermobile)) {
            setError("Buyer's mobile must start with 078, 071, 077, 072, 075, 033, or 011 and be exactly 10 digits long.");
            return;
        }

        if (!validateBuyersName(buyersname)) {
            setError("Buyer's name must contain only letters and spaces.");
            return;
        }

        const AddProducts = {
            productname,
            productwight,
            buyermobile: Number(buyermobile),
            quantity: Number(quantity),
            buyershomeno,
            buyerstreet,
            buyerscity,
            buyersname,
            deliveryPersonId,
        };

        axios.post("http://localhost:8070/addproductmodel/addproduct", AddProducts)
            .then(() => {
                alert("Product added");
                setproductname("");
                setproductwight("");
                setbuyermobile("");
                setquantity("");
                setbuyershomeno("");
                setbuyerstreet("");
                setbuyerscity("");
                setbuyersname("");
                setDeliveryPersonId("");
                setError(""); // Clear error message
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <DeliveryHeader />
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="productname">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productname"
                        placeholder="Enter product name"
                        value={productname}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (validateProductName(value) || value === "") {
                                setproductname(value);
                                setError("");
                            } else {
                                setError("");
                            }
                        }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="setproductwight">Product Weight</label>
                    <input
                        type="text"
                        className="form-control"
                        id="setproductwight"
                        placeholder="Enter product weight (e.g., 150kg, 2g)"
                        value={productwight}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Allow only numbers initially
                            if (/^\d{0,3}$/.test(value)) {
                                setproductwight(value);
                                setError("");
                            } 
                            // Allow appending "g" or "kg" after entering 2 or 3 digits
                            else if (/^\d{2,3}(kg|g)?$/.test(value)) {
                                setproductwight(value);
                                setError("");
                            } 
                            // Prevent any further input once the unit is added
                            else if (value.match(/^\d{2,3}(kg|g)$/)) {
                                setproductwight(value);
                                setError("");
                            } else {
                                setError("");
                            }
                        }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="buyermobile">Buyer's Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="buyermobile"
                        placeholder="Enter buyer's mobile"
                        value={buyermobile}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Allow only the valid prefixes at the beginning
                            if (value.length === 3) {
                                if (!/^(078|071|077|072|075|033|011)$/.test(value)) {
                                    setError("");
                                    return;
                                }
                            } 

                            // Allow only digits and limit to 10 characters
                            if (/^\d*$/.test(value) && value.length <= 10) {
                                setbuyermobile(value);
                                setError("");

                                // Validate if the mobile number is complete
                                if (value.length === 10 && !validateBuyerMobile(value)) {
                                    setError("");
                                }
                            } else {
                                setError("");
                            }
                        }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        placeholder="Enter quantity (1-9)"
                        value={quantity}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Allow only numbers between 1 and 9
                            if (/^[1-9]$/.test(value)) {
                                setquantity(value);
                                setError("");
                            } else {
                                setError("");
                            }
                        }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="buyershomeno">Buyer's Home Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="buyershomeno"
                        placeholder="Enter buyer's home number"
                        onChange={(e) => setbuyershomeno(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="buyerstreet">Buyer's Street</label>
                    <select
                        className="form-control"
                        id="buyerstreet"
                        value={buyerstreet}
                        onChange={(e) => setbuyerstreet(e.target.value)}
                    >
                        <option value="">Select a street</option>
                        {streets.map((street, index) => (
                            <option key={index} value={street}>{street}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="buyerscity">Buyer's City</label>
                    <select
                        className="form-control"
                        id="buyerscity"
                        value={buyerscity}
                        onChange={(e) => setbuyerscity(e.target.value)}
                    >
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="buyersname">Buyer's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="buyersname"
                        placeholder="Enter buyer's name"
                        value={buyersname}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (validateBuyersName(value) || value === "") {
                                setbuyersname(value);
                                setError("");
                            } else {
                                setError("");
                            }
                        }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="deliveryPersonId">Delivery Person ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="deliveryPersonId"
                        placeholder="Enter Delivery Person ID"
                        onChange={(e) => setDeliveryPersonId(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
