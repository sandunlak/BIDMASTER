import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReadProduct() {
    const [addproduct, setaddproduct] = useState([]);
    const [register, setDeliveryPersons] = useState([]); // State to store delivery persons

    useEffect(() => {
        function getaddproduct() {
            axios.get("http://localhost:8070/addproductmodel/readproduct").then((res) => {
                console.log("Product Data:", res.data);
                setaddproduct(res.data); // Insert data into the addproduct state
            }).catch((err) => {
                alert(err.message);
            });
        }
        
        // Function to get delivery persons data
        function getDeliveryPersons() {
            axios.get("http://localhost:8070/registermodel/read").then((res) => {
                setDeliveryPersons(res.data); // Insert data into the register state
            }).catch((err) => {
                alert(err.message);
            });
        }

        getaddproduct();
        getDeliveryPersons();
    }, []);

    // Function to find delivery person by ID (Assuming delivery person ID is available)
    const getDeliveryPersonName = (personId) => {
        const person = register.find((person) => person._id === personId);
        return person ? `${person.fname} ${person.lname}` : "N/A";
    };

    return (
        <div className="container">
            <h1>My Delivery Orders</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Item Name</th>
                        <th>Item Weight</th>
                        <th>Buyer's Mobile</th>
                        <th>Quantity</th>
                        <th>Buyers Address</th>
                        <th>Buyer's Name</th>
                        <th>Delivery Person</th>
                        <th>Delivery Date</th>
                        <th>Delivery Time</th>
                        <th>Delivery Status</th>
                    </tr>
                </thead>
                <tbody>
                    {addproduct.map((addproductmodel, index) => (
                        <tr key={index}>
                            <td>{addproductmodel.id}</td>
                            <td>{addproductmodel.productname}</td>
                            <td>{addproductmodel.productwight}</td>
                            <td>{addproductmodel.buyermobile}</td>
                            <td>{addproductmodel.quantity}</td>
                            <td>{`${addproductmodel.buyershomeno}, ${addproductmodel.buyerstreet}, ${addproductmodel.buyerscity}`}</td>
                            <td>{addproductmodel.buyersname}</td>
                            <td>{getDeliveryPersonName(addproductmodel.deliveryPersonId)}</td> {/* Display the delivery person's name */}
                            <td>{addproductmodel.deliveryDate}</td>
                            <td>{addproductmodel.deliveryTime}</td>
                            <td>{addproductmodel.deliveryStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
