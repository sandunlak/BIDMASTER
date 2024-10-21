import React, { useState } from 'react';


export default function Login(){


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    // Implement authentication logic here
    };

    return(

        <div className="login-container">
      <div className="card shadow-sm">
        <div className="card-body">
        <div className="text-center mb-4">
            <img
              src="/Assests/bid-master-logo-zip-file/png/logo-white.png"
              alt="Company Logo"
              className="img-fluid"
              style={styles.logo}
            />
          </div>

          <h2 className="text-center mb-4">Bidder Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-outline-dark me-2" type="button" style={{
                    width:150,
                    height:50
                }}>
              Login 
            </button>
          </form>
          <div className="links mt-3">
            <a href="/signup" className="link">Don't have an account?</a><br></br>
            <a href="/SellerLogin" className="link ml-3">Seller?</a><br></br>
            <a href="/AdminLogin" className="link ml-3">Admin?</a>
          </div>
        </div>
      </div>
    </div>
  );

    
}

const styles = {

    logo: {

        width: '150px',
        height: '150px',
        borderRadius: '50%', // Makes the image round
        border: '5px solid #00000', // Adds a border around the image
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)', // Adds shadow for depth
        objectFit: 'cover', // Ensures the image covers the area without distortion

      },
}