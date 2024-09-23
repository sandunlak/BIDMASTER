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

    // Real-time validation
    const validateForm = () => {
        const newErrors = {};

        if (!fname) newErrors.fname = "First name is required";
        else if (fname.length > 10) newErrors.fname = "First name must be at most 10 characters";
        else if (!/^[A-Za-z]+$/.test(fname)) newErrors.fname = "First name can only contain letters";

        if (!lname) newErrors.lname = "Last name is required";
        else if (lname.length > 10) newErrors.lname = "Last name must be at most 10 characters";
        else if (!/^[A-Za-z]+$/.test(lname)) newErrors.lname = "Last name can only contain letters";

        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid";

        if (!number) newErrors.number = "Number is required";
        else if (!/^(078|077|076|075|071|033|011)[0-9]{7}$/.test(number)) newErrors.number = "Invalid number format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";
        else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/.test(password)) {
            newErrors.password = "Password must contain letters, numbers, and special characters";
        }

        if (!street) newErrors.street = "Street is required";

        if (!city) newErrors.city = "City is required";

        if (!nic) newErrors.nic = "NIC is required";
        else if (!/^\d{11}[A-Za-z0-9]$/.test(nic)) newErrors.nic = "NIC must be 12 characters long (11 digits + 1 letter or digit)";

        if (!dlisen) newErrors.dlisen = "Driving License is required";
        else if (!/^[A-Za-z][A-Za-z0-9]{7}$/.test(dlisen)) newErrors.dlisen = "Driving License must start with a letter and be 8 characters long";

        return newErrors;
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
                alert("Product added");
                setfname("");
                setlname("");
                setemail("");
                setnumber("");
                setpassword("");
                setstreet("");
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
                        maxLength="10" // Limit characters to 10
                        value={fname}
                        onChange={(e) => {
                            if (/^[A-Za-z]*$/.test(e.target.value)) { // Restrict to letters only
                                setfname(e.target.value);
                                setErrors({ ...errors, fname: "" }); // Clear error on input
                            }
                        }} />
                    {errors.fname && <small className="text-danger">{errors.fname}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" className="form-control" id="lname" placeholder="Last Name"
                        maxLength="10" // Limit characters to 10
                        value={lname}
                        onChange={(e) => {
                            if (/^[A-Za-z]*$/.test(e.target.value)) { // Restrict to letters only
                                setlname(e.target.value);
                                setErrors({ ...errors, lname: "" }); // Clear error on input
                            }
                        }} />
                    {errors.lname && <small className="text-danger">{errors.lname}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                            setErrors({ ...errors, email: "" }); // Clear error on input
                        }} />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="number">Number</label>
                    <input type="text" className="form-control" id="number" placeholder="Number"
                        maxLength="10" // Limit characters to 10
                        value={number}
                        onChange={(e) => {
                            if (/^(078|077|076|075|071|033|011)?[0-9]*$/.test(e.target.value)) { // Restrict to valid patterns
                                setnumber(e.target.value);
                                setErrors({ ...errors, number: "" }); // Clear error on input
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
                            setErrors({ ...errors, password: "" }); // Clear error on input
                        }} />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" id="street" placeholder="Street"
                        value={street}
                        onChange={(e) => {
                            setstreet(e.target.value);
                            setErrors({ ...errors, street: "" }); // Clear error on input
                        }} />
                    {errors.street && <small className="text-danger">{errors.street}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="City"
                        value={city}
                        onChange={(e) => {
                            setcity(e.target.value);
                            setErrors({ ...errors, city: "" }); // Clear error on input
                        }} />
                    {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="nic">NIC</label>
                    <input type="text" className="form-control" id="nic" placeholder="NIC"
                        maxLength="12" // Limit to 12 characters
                        value={nic}
                        onChange={(e) => {
                            if (/^\d{0,11}[A-Za-z0-9]?$/.test(e.target.value)) { // Allow only valid NIC format
                                setnic(e.target.value);
                                setErrors({ ...errors, nic: "" }); // Clear error on input
                            }
                        }} />
                    {errors.nic && <small className="text-danger">{errors.nic}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="dlisen">Driving License</label>
                    <input type="text" className="form-control" id="dlisen" placeholder="Driving License"
                        maxLength="8" // Limit to 8 characters
                        value={dlisen}
                        onChange={(e) => {
                            if (/^[A-Za-z][A-Za-z0-9]{0,7}$/.test(e.target.value)) { // Allow only valid Driving License format
                                setdlisen(e.target.value);
                                setErrors({ ...errors, dlisen: "" }); // Clear error on input
                            }
                        }} />
                    {errors.dlisen && <small className="text-danger">{errors.dlisen}</small>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
