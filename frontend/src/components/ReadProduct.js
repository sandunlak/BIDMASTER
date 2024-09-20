import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReadProduct() {
    const [addproduct, setAddProduct] = useState([]);
    const [deliveries, setDeliveries] = useState([]); // State to store delivery records
    const [register, setDeliveryPersons] = useState([]); // State to store delivery persons

    useEffect(() => {
        // Fetch product data
        const getAddProduct = () => {
            axios.get("http://localhost:8070/addproductmodel/readproduct")
                .then((res) => {
                    setAddProduct(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        };

        // Fetch delivery data
        const getDeliveries = () => {
            axios.get("http://localhost:8070/adddeliverymodel/readdelivery")
                .then((res) => {
                    setDeliveries(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        };

        // Fetch delivery persons data
        const getDeliveryPersons = () => {
            axios.get("http://localhost:8070/registermodel/read")
                .then((res) => {
                    setDeliveryPersons(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        };

        getAddProduct();
        getDeliveries();
        getDeliveryPersons();
    }, []);

    // Function to find delivery person by ID
    const getDeliveryPersonName = (personId) => {
        const person = register.find((person) => person._id === personId);
        return person ? `${person.fname} ${person.lname}` : "N/A";
    };

    // Function to get delivery details by product ID
    const getDeliveryDetails = (productId) => {
        const delivery = deliveries.find((delivery) => delivery.productId === productId); // Adjust this line based on your schema
        return delivery ? {
            date: delivery.dDate,
            time: delivery.dTime,
            status: delivery.dStates
        } : { date: "N/A", time: "N/A", status: "N/A" };
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
                    {addproduct.map((addproductmodel, index) => {
                        const deliveryDetails = getDeliveryDetails(addproductmodel.id); // Fetch delivery details based on product ID
                        return (
                            <tr key={index}>
                                <td>{addproductmodel.id}</td>
                                <td>{addproductmodel.productname}</td>
                                <td>{addproductmodel.productwight}</td>
                                <td>{addproductmodel.buyermobile}</td>
                                <td>{addproductmodel.quantity}</td>
                                <td>{`${addproductmodel.buyershomeno}, ${addproductmodel.buyerstreet}, ${addproductmodel.buyerscity}`}</td>
                                <td>{addproductmodel.buyersname}</td>
                                <td>{getDeliveryPersonName(addproductmodel.deliveryPersonId)}</td>
                                <td>{deliveryDetails.date}</td> {/* Display delivery date */}
                                <td>{deliveryDetails.time}</td> {/* Display delivery time */}
                                <td>{deliveryDetails.status}</td> {/* Display delivery status */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
