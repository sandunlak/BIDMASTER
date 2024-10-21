import React, { useState } from "react";
import axios from "axios";
import DeliveryHeader from "../delivery/DeliveryHeader";

export default function AddDeliveryPerson() {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [number, setnumber] = useState("");
    const [password, setpassword] = useState("");
    const [street, setstreet] = useState("");
    const [city, setcity] = useState("");
    const [nic, setnic] = useState("");
    const [dlisen, setdlisen] = useState("");
    const [errors, setErrors] = useState({});

    // Array of streets in Sri Lanka
    const sriLankanStreets = [
        "Galle Road", 
        "High Level Road", 
        "Kandy Road", 
        "Baseline Road", 
        "Duplication Road", 
        "Wijerama Road", 
        "Bauddhaloka Mawatha",
        "Dalada Veediya",
        "Peradeniya Road",
        "Havelock Road",
        "Ward Place"
    ];

    // Array of cities in Sri Lanka
    const sriLankanCities = [
        "Colombo",
        "Galle",
        "Kandy",
        "Jaffna",
        "Negombo",
        "Kurunegala",
        "Ratnapura",
        "Trincomalee",
        "Badulla",
        "Matara",
        "Anuradhapura",
        "Batticaloa",
        "Puttalam",
        "Nuwara Eliya"
    ];

    // Real-time validation
    const validateForm = () => {
        const newErrors = {};

        if (!fname) newErrors.fname = "First name is required";
        else if (fname.length > 10) newErrors.fname = "First name must be at most 10 characters";
        else if (!/^[A-Za-z]+$/.test(fname)) newErrors.fname = "First name can only contain letters";

        if (!lname) newErrors.lname = "Last name is required";
        else if (lname.length > 10) newErrors.lname = "Last name must be at most 10 characters";
        else if (!/^[A-Za-z]+$/.test(lname)) newErrors.lname = "Last name can only contain letters";

        if (!number) newErrors.number = "Number is required";
        else if (!/^(078|077|076|075|071|033|011)[0-9]{7}$/.test(number)) newErrors.number = "Invalid number format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";
        else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/.test(password)) {
            newErrors.password = "Password must contain letters, numbers, and special characters";
        }

        if (!street) newErrors.street = "Street is required";
        if (!city) newErrors.city = "City is required";

        if (!nic) {
            newErrors.nic = "NIC is required";
        } else if (!/^\d{11}[Vv\d]$/.test(nic)) {
            newErrors.nic = "NIC must have 11 digits followed by a number or 'V/v'";
        }

        if (!dlisen) {
            newErrors.dlisen = "Driving License is required";
        } else if (!/^[ABab][0-9]{7}$/.test(dlisen)) {
            newErrors.dlisen = "Driving License must start with 'A' or 'B' followed by 7 digits";
        }

        return newErrors;
    };

    const validateEmail = (value) => {
        if (!value) return; // Don't validate if empty
        if (!/\S+@\S+\.\S+/.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: "Email must be a valid format" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear error if valid
        }
    };

    const sendData = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const AddDeliveryPersons = {
            fname,
            lname,
            email,
            number,
            password,
            street,
            city,
            nic,
            dlisen,
        };

        axios.post("http://localhost:8070/adddeliveryperson/addperson", AddDeliveryPersons)
            .then(() => {
                alert("Delivery person added");
                setfname("");
                setlname("");
                setemail("");
                setnumber("");
                setpassword("");
                setstreet(""); // Reset street field
                setcity("");
                setnic("");
                setdlisen("");
                setErrors({}); // Clear errors
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="container">
            <DeliveryHeader />
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" className="form-control" id="fname" placeholder="First Name"
                        maxLength="10"
                        value={fname}
                        onChange={(e) => {
                            if (/^[A-Za-z]*$/.test(e.target.value)) {
                                setfname(e.target.value);
                                setErrors({ ...errors, fname: "" });
                            }
                        }} />
                    {errors.fname && <small className="text-danger">{errors.fname}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" className="form-control" id="lname" placeholder="Last Name"
                        maxLength="10"
                        value={lname}
                        onChange={(e) => {
                            if (/^[A-Za-z]*$/.test(e.target.value)) {
                                setlname(e.target.value);
                                setErrors({ ...errors, lname: "" });
                            }
                        }} />
                    {errors.lname && <small className="text-danger">{errors.lname}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            const inputValue = e.target.value.toLowerCase();
                            setemail(inputValue);
                        }}
                        onBlur={() => validateEmail(email)} // Validate on blur
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="number">Number</label>
                    <input type="text" className="form-control" id="number" placeholder="Number"
                        maxLength="10"
                        value={number}
                        onChange={(e) => {
                            if (/^(078|077|076|075|071|033|011)?[0-9]*$/.test(e.target.value)) {
                                setnumber(e.target.value);
                                setErrors({ ...errors, number: "" });
                            }
                        }} />
                    {errors.number && <small className="text-danger">{errors.number}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                            setErrors({ ...errors, password: "" });
                        }} />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <select
                        className="form-control"
                        id="street"
                        value={street}
                        onChange={(e) => {
                            setstreet(e.target.value);
                            setErrors({ ...errors, street: "" });
                        }}
                    >
                        <option value="">Select a Street</option>
                        {sriLankanStreets.map((streetName, index) => (
                            <option key={index} value={streetName}>
                                {streetName}
                            </option>
                        ))}
                    </select>
                    {errors.street && <small className="text-danger">{errors.street}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={(e) => {
                            setcity(e.target.value);
                            setErrors({ ...errors, city: "" });
                        }}
                    >
                        <option value="">Select a City</option>
                        {sriLankanCities.map((cityName, index) => (
                            <option key={index} value={cityName}>
                                {cityName}
                            </option>
                        ))}
                    </select>
                    {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="nic">NIC</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nic"
                        placeholder="NIC"
                        maxLength="12"
                        value={nic}
                        onChange={(e) => {
                            const nicValue = e.target.value;
                            const nicRegex = /^\d{0,11}[Vv\d]?$/;

                            if (nicRegex.test(nicValue)) {
                                setnic(nicValue);
                                setErrors({ ...errors, nic: "" });
                            }
                        }}
                    />
                    {errors.nic && <small className="text-danger">{errors.nic}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="dlisen">Driving License</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dlisen"
                        placeholder="Driving License"
                        maxLength="8"
                        value={dlisen}
                        onChange={(e) => {
                            const dlisenValue = e.target.value;
                            const dlisenRegex = /^[AB][0-9]{0,7}$/; 
                            
                            if (dlisenRegex.test(dlisenValue)) { 
                                setdlisen(dlisenValue); 
                                setErrors({ ...errors, dlisen: "" });
                            } else if (dlisenValue.length <= 8) {
                                setdlisen(dlisenValue.substring(0, dlisenValue.length - 1));
                            }
                        }}
                    />
                    {errors.dlisen && <small className="text-danger">{errors.dlisen}</small>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
