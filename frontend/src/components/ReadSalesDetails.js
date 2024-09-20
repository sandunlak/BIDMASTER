import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReadSalesDetails() {
    const [register, setRegister] = useState([]);

    useEffect(() => {
        function getRegister() {
            axios.get("http://localhost:8070/registermodel/read").then((res) => {
                console.log(res.data);
                setRegister(res.data); // Insert data into the register state
            }).catch((err) => {
                alert(err.message);
            });
        }
        getRegister();
    }, []);

    // Function to handle the delete operation
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/registermodel/deleteperson/${id}`)
            .then((res) => {
                alert("User deleted successfully");
                // Remove the deleted user from the state
                setRegister(register.filter((registermodel) => registermodel._id !== id));
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="container">
            <h1>All Delivery Persons</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {register.map((registermodel, index) => (
                        <tr key={index}>
                            <td>{registermodel.fname}</td>
                            <td>{registermodel.lname}</td>
                            <td>{registermodel.email}</td>
                            <td>{registermodel.number}</td>
                            <td>{registermodel.street}</td>
                            <td>{registermodel.city}</td>
                            <td>
                                {/* Delete button */}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(registermodel._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
