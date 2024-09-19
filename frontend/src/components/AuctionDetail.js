import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../AuctionDetail.css';
import { Link } from 'react-router-dom';

export default function AuctionDetail() {
  const { id } = useParams(); // Extract auction ID from URL
  const [auction, setAuction] = useState(null); // State to store auction data
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch the auction by ID from the backend
    axios.get(`http://localhost:8070/auction/${id}`)
      .then(response => {
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
    <Container className="auction-page">
      <Row className="auction-header">
        <h1>{auction.title}</h1>
      </Row>
      <Row>
        <Col md={4} className="sellers-section">
          <h3>Sellers</h3>
          <div className="sellers">
            {auction.sellers && auction.sellers.map((seller, index) => (
              <div key={index} className="seller-profile">
                <Image src={seller.image || "/default-seller.jpg"} roundedCircle />
                <p>{seller.name}</p>
              </div>
            ))}
          </div>
        </Col>
        <Col md={7} className="auction-items-section">
          <h3>Auction Items</h3>
          <div className="auction-items">
            {auction.items && auction.items.map((item, index) => (
              <div key={index} className="auction-item">
                <Image
                  src={item.images[0]?.data || "/default-item.jpg"}
                  roundedCircle
                  alt={item.name}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }} // Display as circular image
                />
                <h5>{item.name}</h5>
                <p>Starting Price: ${item.startingPrice}</p>
                <Button 
                style={{
                  backgroundColor:"#507687",
                  color:"white",
                  border:"0"

                }}
                
                >View</Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="auction-details">
          <p>
            <strong>Date:</strong> {new Date(auction.startingDateTime).toLocaleDateString()}<br />
            <strong>Venue:</strong> {auction.location}<br />
            <strong>Time:</strong> {new Date(auction.startingDateTime).toLocaleTimeString()}<br />
            <strong>Category:</strong> {auction.category}<br />
          </p>
          <p>{auction.description}</p>
        </Col>
        <Col md={8} className="auction-register">
          <Button variant="secondary" size="lg" block>
          <Link to={`/RegisterToAuction/${auction._id}`} className="btn btn-outline-danger">Register to auction</Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
