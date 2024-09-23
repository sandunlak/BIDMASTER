// src/components/PaymentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:8070/payment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };
        fetchPayments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/payment/delete/${id}`);
            setPayments(payments.filter(payment => payment._id !== id));
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Payments</h1>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Full Name</th>
                        <th>Card Type</th>
                        <th>Card Number</th>
                        <th>Expiration Date</th>
                        <th>CVV</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id}>
                            <td>{payment.fullName}</td>
                            <td>{payment.cardType}</td>
                            <td>{payment.cardNumber}</td>
                            <td>{payment.expirationMonth}/{payment.expirationYear}</td>
                            <td>{payment.cvv}</td>
                            <td>{payment.email}</td>
                            <td>{payment.address}</td>
                            <td>{payment.city}</td>
                            <td>{payment.state}</td>
                            <td>{payment.zipCode}</td>
                            <td>
                                <Link to={`/edit/${payment._id}`}>
                                    <button className="btn btn-success me-2">Edit</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(payment._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;
