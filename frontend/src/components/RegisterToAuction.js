import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../AuctionDetail.css';

export default function RegisterToAuction() {
  const { id } = useParams(); // Extract auction ID from URL
  const [auction, setAuction] = useState(null); // State to store auction data
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch the auction by ID from the backend
    axios.get(`http://localhost:8070/auction/${id}`)
      .then(response => {
        console.log(response.data); // Debugging line
        setAuction(response.data); // Set auction data
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching auction:', error);
        setLoading(false); // Stop loading in case of error
      });
  }, [id]); // Fetch auction data when the ID changes

  if (loading) {
    return <p>Loading auction details...</p>;
  }

  if (!auction) {
    return <p>Auction not found.</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container bg-white shadow-lg rounded p-4"
        style={{
          maxWidth: '90%',
          width: '400px',
          padding: '30px',
          border: '1px solid #ddd',
          textAlign: 'center',
        }}>
        <h3 className="mb-4 text-primary">Register to auction as: </h3>
        <button className="btn btn-primary mb-3 py-3"
          style={{
            width: '100%',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: '#007bff', // Primary color
            borderColor: '#007bff'
          }}>
          <a href='#' style={{ color: 'white', textDecoration: 'none' }}>
            Bidder
          </a>
        </button>
        <p className="my-3 text-muted">OR</p>
        <button className="btn"
          style={{
            width: '100%',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: '#dc3545', // Red color
            borderColor: '#dc3545',
            color: 'white'
          }}>
          <Link to={`/RegisterToAuction/${auction._id}/RegisterToAuctionAsSeller`} style={{ color: 'white', textDecoration: 'none' }}>
            Seller
          </Link>
        </button>
      </div>
    </div>
  );
}
