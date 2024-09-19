import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SellerAccount() {
    const [activeTab, setActiveTab] = useState('personal-details');
    const [sellerData, setSellerData] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.get('http://localhost:8070/seller/me', {
                headers: { 'authToken': token }
            })
            .then(response => {
                if (response.data) {
                    setSellerData(response.data);
                    setFormData(response.data);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the seller data!", error);
            });
        } else {
            console.error("No token found");
        }
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.put('http://localhost:8070/seller/me', formData, {
                headers: { 'authToken': token }
            })
            .then(response => {
                setSellerData(response.data);
            })
            .catch(error => {
                console.error("There was an error updating the seller data!", error);
            });
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Do you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('authToken'); // Remove the token from local storage
            navigate('/ItemListView'); // Navigate to the ItemListView page
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="personal-details">Personal details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="registered-auction">Registered auction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="analytics">Analytics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="edit-profile">Edit profile</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className="card mt-4 p-4" style={{ marginBottom: 90 }}>
                        {activeTab === 'personal-details' && sellerData && (
                            <>
                                <div className="text-center">
                                    <img
                                        src="/Assests/steve.webp"
                                        alt="Profile"
                                        className="rounded-circle mb-4"
                                        style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0' }}
                                    />
                                </div>
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Email :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={sellerData.email} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Name :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={`${sellerData.firstName} ${sellerData.lastName}`} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Address :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={sellerData.address} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>NIC :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue="200214578952" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Company :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={sellerData.companyName || "N/A"} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Birth Day :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={new Date(sellerData.birthday).toLocaleDateString()} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Phone Number :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={sellerData.contactInfo} />
                                        </Col>
                                    </Form.Group>
                                    {/* Logout Button */}
                                    <div className="text-center mt-4">
                                        <Button variant="danger" onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        )}
                        {activeTab === 'edit-profile' && sellerData && (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Email :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email || ''}
                                                onChange={handleEditChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Name :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName || ''}
                                                onChange={handleEditChange}
                                            />
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName || ''}
                                                onChange={handleEditChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Address :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={formData.address || ''}
                                                onChange={handleEditChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3"><strong>Phone Number :</strong></Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="contactInfo"
                                                value={formData.contactInfo || ''}
                                                onChange={handleEditChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">Save Changes</Button>
                                </Form>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
