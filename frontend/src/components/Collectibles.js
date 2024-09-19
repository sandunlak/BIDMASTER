import React, { useEffect, useState } from "react";
import axios from "axios";


import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function Collectibles(){
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getArts() {
          try {
            const response = await axios.get("http://localhost:8070/item/", {
              params: { category: "Collectibles" },
            });
            setItems(response.data);
          } catch (error) {
            console.error("There was an error fetching the items!", error);
          }
        }
    
        getArts();
      }, []);
      

      

    return (
        <div className="container mt-5">
      <h1 className="text-center mb-4">Collectibles</h1>

      <hr></hr>
      <div className="container" style={{
        width:700,
        height:200
        }}>
          <h6 style={{marginBottom:70}}>
          Collectibles are cherished items that hold personal,
       historical, or cultural significance, often treasured 
       for their rarity and uniqueness. Ranging from vintage toys 
       and coins to stamps, artwork, and memorabilia, collectibles offer 
       a tangible connection to the past, preserving memories and moments 
       in time. For collectors, these items are not just possessions but a 
       reflection of passion, identity, and the joy of discovery. Collectibles
        often appreciate in value over time, making them both sentimental keepsakes
         and potential investments, 
      each piece adding to the story of a collection.

          </h6>
        
      </div>
      <hr></hr>
      
        
      <br></br>
      <div className="row">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={item.images[0]?.data || '/path-to-placeholder-image.jpg'}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="card-text">
                    <strong>Brand:</strong> {item.brand}
                  </p>
                  <p className="card-text">
                    <strong>Starting Price:</strong> ${item.startingPrice}
                  </p>
                  <button className="btn btn-outline-dark ms-2" type="button">
                    View Item
                  </button>
                  <button className="btn btn-outline-danger" style={{
                                float: 'right'
                            }}>
                            <FontAwesomeIcon icon={faHeart} />
                            </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No items found in the Arts category.</p>
          </div>
        )}
      </div>
    </div>
        )
}