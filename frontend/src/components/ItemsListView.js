import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function ItemListView() {
    const [items, setItems] = useState([]);
    const location = useLocation(); // Get the current URL location

    // Function to parse query parameters
  const getQueryParams = () => {
    const query = new URLSearchParams(location.search);
    return {
      search: query.get('search') || '',
      category: query.get('category') || '',
      minPrice: query.get('minPrice') || '',
      maxPrice: query.get('maxPrice') || ''
    };
  };
    

    // Fetch items based on filters
  const getItems = () => {
    const { search, category, minPrice, maxPrice } = getQueryParams();
    axios
      .get("http://localhost:8070/item", {
        params: { search, category, minPrice, maxPrice } // Pass filters as query params
      })
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  };
  useEffect(() => {
    getItems(); // Fetch items when component mounts or URL changes
  }, [location.search]); // Depend on location.search to refetch on query change


   
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Items List</h1>
            {/* Filter Inputs */}
            

            <div className="row">
                {items.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No items match your search criteria.</p>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card h-100">
                                <img
                                    src={item.images[0]?.data || 'placeholder-image-url'}
                                    alt={item.name}
                                    className="card-img-top"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundColor: '#f0f0f0'
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"><strong>Category:</strong> {item.category}</p>
                                    <p className="card-text"><strong>Brand:</strong> {item.brand}</p>
                                    <p className="card-text"><strong>Starting Price:</strong> ${item.startingPrice}</p>
                                    <button className="btn btn-outline-dark ms-2" type="submit">
                                        View Item
                                    </button>
                                    <button className="btn btn-outline-danger" style={{ float: 'right' }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}