import React, { useEffect, useState } from "react";
import axios from "axios";


import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function Jewellery(){
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getArts() {
          try {
            const response = await axios.get("http://localhost:8070/item/", {
              params: { category: "Jewellery" },
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
      <h1 className="text-center mb-4">Jewellery</h1>

      <hr></hr>
      <div className="container" style={{
        width:700,
        height:200
        }}>
          <h6 style={{marginBottom:70}}>
          Jewelry is more than just adornment; it is a timeless form of personal 
          expression and cultural significance. Crafted from precious metals, gemstones, 
          and other materials, jewelry has been used throughout history to symbolize status,
           celebrate milestones, and convey sentiments. Whether it's a simple piece worn daily or
            an elaborate design reserved for special occasions, jewelry reflects the wearer's 
            personality, heritage, and values. Each piece tells a story, blending artistry with 
            tradition, and continues to hold a special place in human culture as both a decorative 
            art and a cherished keepsake.
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