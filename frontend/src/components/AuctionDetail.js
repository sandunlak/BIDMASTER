import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../AuctionDetail.css';
import { Link } from 'react-router-dom';

export default function AuctionDetail() {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8070/auction/${id}`)
            .then(response => {
                setAuction(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching auction:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading auction details...</p>;
    }

    if (!auction) {
        return <p>Auction not found.</p>;
    }

    return (
        <Container className="auction-page" style={{ padding: '20px' }}>
            <Row className="auction-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#34495e', fontWeight: 'bold' }}>{auction.title}</h1>
            </Row>

            <Row>
    <Col md={4} className="auction-details mx-auto" style={{ padding: '20px',

      
     }}>
        <Card style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <p>
                <strong>Date:</strong> {new Date(auction.startingDateTime).toLocaleDateString()}
                <br />
                <strong>Venue:</strong> {auction.location}
                <br />
                <strong>Time:</strong> {new Date(auction.startingDateTime).toLocaleTimeString()}
                <br />
                <strong>Category:</strong> {auction.category}
            </p>
            <p>{auction.description}</p>
        </Card>
    </Col>
</Row>

            <Row>
                {/* Sellers Section */}
                <Col md={3} className="sellers-section">
                    <h3 style={{ color: '#2c3e50' }}>Sellers</h3>
                    <div className="sellers" style={{ marginTop: '20px' }}>
                        {auction.registeredUsers && auction.registeredUsers.map((seller, index) => (
                            <Card key={index} style={{ padding: '10px', marginBottom: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                              
                            }}>
                                <div className="seller-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image
                                        src={seller.image || "/Assests/defaultprofile.jpg"}
                                        roundedCircle
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            marginRight: "15px"
                                        }}
                                    />
                                    <p style={{ fontSize: '16px', color: '#2c3e50' }}>{seller.firstName}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Col>

                {/* Auction Items Section */}
                <Col md={7} className="auction-items-section">
                    <h3 style={{ color: '#2c3e50' }}>Auction Items</h3>
                    <div className="auction-items" style={{ marginTop: '20px' }}>
                        {auction.items && auction.items.map((item, index) => (
                            <Card key={index} style={{ padding: '10px', marginBottom: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                <div className="auction-item" style={{ textAlign: 'center' }}>
                                    <Image
                                        src={item.images[0]?.data || "/default-item.jpg"}
                                        roundedCircle
                                        alt={item.name}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <h5 style={{ color: '#34495e' }}>{item.name}</h5>
                                    <p style={{ color: '#7f8c8d' }}>Starting Price: ${item.startingPrice}</p>
                                    <Button
                                        style={{
                                            backgroundColor: '#3498db',
                                            borderColor: '#3498db',
                                            padding: '5px 20px',
                                            color: 'white',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        View
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Auction Details and Register Section */}
            <Row>                
    <Col md={8} className="auction-register mx-auto" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="danger" size="lg" block style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px 50px' }}>
            <Link
                to={`/RegisterToAuction/${auction._id}`}
                style={{
                    textDecoration: 'none',
                    color: 'white'
                }}
            >
                Register to auction
            </Link>
        </Button>
    </Col>
</Row>
        </Container>
    );
}
