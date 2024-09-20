import React, { useState } from "react";
import axios from "axios";

export default function AddDelivery() {
  const [dDate, setdDate] = useState("");
  const [dTime, setdTime] = useState("");
  const [dStates, setdStates] = useState("");

  function sendData(e) {
    e.preventDefault();

    const adddeliverys = {
      dDate,
      dTime,
      dStates,
    };

    axios
      .post("http://localhost:8070/adddeliverymodel/adddelivery",adddeliverys) // Fixed endpoint here
      .then(() => {
        alert("Delivery added");
        setdDate("");
        setdTime("");
        setdStates("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="dDate">Delivery Date</label>
          <input
            type="text"
            className="form-control"
            id="dDate"
            placeholder="Enter delivery date"
            value={dDate}
            onChange={(e) => setdDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dTime">Delivery Time</label>
          <input
            type="text"
            className="form-control"
            id="dTime"
            placeholder="Enter delivery time"
            value={dTime}
            onChange={(e) => setdTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dStates">Delivery States</label>
          <input
            type="text" // Changed type to number for better validation
            className="form-control"
            id="dStates"
            placeholder="Enter delivery states"
            value={dStates}
            onChange={(e) => setdStates(e.target.value)} 
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
