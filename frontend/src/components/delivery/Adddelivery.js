// AddDelivery.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NewDeliveryHeader from "../delivery/NewDeliveryHeader";

const AddDelivery = () => {
    const [dDate, setdDate] = useState("");
    const [dTime, setdTime] = useState("");
    const [dStates, setdStates] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId");

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:8070/adddeliverymodel/readdelivery/${productId}`)
                .then((res) => {
                    const delivery = res.data;
                    if (delivery) {
                        setdDate(delivery.dDate);
                        setdTime(delivery.dTime);
                        setdStates(delivery.dStates);
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        }
    }, [productId]);

    const sendData = (e) => {
        e.preventDefault();

        const addDelivery = {
            productId,
            dDate,
            dTime,
            dStates,
        };

        axios.post("http://localhost:8070/adddeliverymodel/adddelivery", addDelivery)
            .then(() => {
                alert("Delivery added/updated");
                navigate("/readproduct");
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="container">
            <NewDeliveryHeader />
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="dDate">Delivery Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dDate"
                        value={dDate}
                        onChange={(e) => setdDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dTime">Delivery Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="dTime"
                        value={dTime}
                        onChange={(e) => setdTime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dStates">Delivery Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dStates"
                        value={dStates}
                        onChange={(e) => setdStates(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddDelivery;
