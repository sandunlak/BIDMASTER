import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [dateFilter, setDateFilter] = useState(''); // Filter by date
  const [categoryFilter, setCategoryFilter] = useState(''); // Filter by category
  const [locationFilter, setLocationFilter] = useState(''); // Filter by location

  useEffect(() => {
    // Fetch auctions from the backend
    axios.get('http://localhost:8070/auction/all')
      .then((response) => {
        setAuctions(response.data);
        applyFilters(response.data); // Apply filters to fetched auctions
      })
      .catch((error) => {
        console.error('Error fetching auctions:', error);
      });
  }, [dateFilter, categoryFilter, locationFilter]);

  const applyFilters = (auctions) => {
    let filtered = auctions;

    if (dateFilter) {
      const now = new Date();
      filtered = filtered.filter(auction => {
        const auctionDate = new Date(auction.startingDateTime);
        switch (dateFilter) {
          case 'Happening now':
            return auctionDate >= now;
          case 'Next 7 Days':
            return auctionDate <= new Date(now.setDate(now.getDate() + 7));
          case 'Next 30 Days':
            return auctionDate <= new Date(now.setDate(now.getDate() + 30));
          case 'Next 60 Days':
            return auctionDate <= new Date(now.setDate(now.getDate() + 60));
          case 'Next 90 Days':
            return auctionDate <= new Date(now.setDate(now.getDate() + 90));
          default:
            return true;
        }
      });
    }

    if (categoryFilter) {
      filtered = filtered.filter(auction => auction.category === categoryFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter(auction => auction.location === locationFilter);
    }

    setFilteredAuctions(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setDateFilter('');
    setCategoryFilter('');
    setLocationFilter('');
    setFilteredAuctions(auctions); // Reset the filtered auctions to the full list
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-dark">Upcoming Auctions</h1>
      <div className="row">
        <div className="col-md-3">
          <h5>Dates</h5>
          <ul className="list-unstyled">
            <li><input type="radio" name="date" onChange={() => setDateFilter('Happening now')} checked={dateFilter === 'Happening now'} /> Happening now</li>
            <li><input type="radio" name="date" onChange={() => setDateFilter('Next 7 Days')} checked={dateFilter === 'Next 7 Days'} /> Next 7 Days</li>
            <li><input type="radio" name="date" onChange={() => setDateFilter('Next 30 Days')} checked={dateFilter === 'Next 30 Days'} /> Next 30 Days</li>
            <li><input type="radio" name="date" onChange={() => setDateFilter('Next 60 Days')} checked={dateFilter === 'Next 60 Days'} /> Next 60 Days</li>
            <li><input type="radio" name="date" onChange={() => setDateFilter('Next 90 Days')} checked={dateFilter === 'Next 90 Days'} /> Next 90 Days</li>
          </ul>
          <hr />
          <h5>Categories</h5>
          <ul className="list-unstyled">
            <li><input type="radio" name="category" onChange={() => setCategoryFilter('Art')} checked={categoryFilter === 'Art'} /> Art</li>
            <li><input type="radio" name="category" onChange={() => setCategoryFilter('Collectibles')} checked={categoryFilter === 'Collectibles'} /> Collectibles</li>
            <li><input type="radio" name="category" onChange={() => setCategoryFilter('Jewellery')} checked={categoryFilter === 'Jewellery'} /> Jewellery</li>
          </ul>
          <hr />
          <h5>Location</h5>
          <ul className="list-unstyled">
            <li><input type="radio" name="location" onChange={() => setLocationFilter('BMICH Colombo')} checked={locationFilter === 'BMICH Colombo'} /> BMICH Colombo</li>
            <li><input type="radio" name="location" onChange={() => setLocationFilter('KCC Kandy')} checked={locationFilter === 'KCC Kandy'} /> KCC Kandy</li>
            <li><input type="radio" name="location" onChange={() => setLocationFilter('Negombo')} checked={locationFilter === 'Negombo'} /> Negombo</li>
          </ul>
          <button className="btn btn-outline-secondary mt-3" onClick={resetFilters}>Reset Filters</button> {/* Reset button */}
        </div>
        <div className="col-md-8">
          <div className="white-container">
            {filteredAuctions.length > 0 ? (
              filteredAuctions.map((auction) => (
                <div className="card mb-4" key={auction._id}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={auction.image || "/default-image.jpg"} className="img-fluid rounded-start" alt={auction.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{auction.title}</h5>
                        <p className="card-text">{auction.description}</p>
                        <h5 className="card-text">{auction.startingDateTime}</h5>
                        <div className="d-flex justify-content-between">
                          <Link to={`/auction/${auction._id}`} className="btn btn-secondary">View Auction</Link>
                          <Link to={`/RegisterToAuction/${auction._id}`} className="btn btn-outline-danger">Register to auction</Link>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No auctions available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
