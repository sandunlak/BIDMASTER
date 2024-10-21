import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NewDeliveryHeader from "../delivery/NewDeliveryHeader";

const DeliverPersonEdit = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [deliveryDetails, setDeliveryDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch delivery details based on product ID
        axios.get(`http://localhost:8070/adddeliverymodel/readdelivery/${id}`)
            .then((res) => {
                console.log(res.data);  // Log the data to check what is received
                setDeliveryDetails(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [id]);

    const handleEdit = () => {
        navigate(`/adddelivery?productId=${id}`); // Navigate to the AddDelivery page
    };

    return (
        <div className="container">
            <NewDeliveryHeader />
            
            <h1>Delivery Details</h1>
            {deliveryDetails ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            
                            <th>Delivery Date</th>
                            <th>Delivery Time</th>
                            <th>Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                            <td>{deliveryDetails.dDate || "N/A"}</td> {/* Display delivery date */}
                            <td>{deliveryDetails.dTime || "N/A"}</td> {/* Display delivery time */}
                            <td>{deliveryDetails.dStates || "N/A"}</td> {/* Display delivery status */}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
};

export default DeliverPersonEdit;
