import './App.css';
import AddStudent from './components/AddStudent';
import Header from './components/Header';
import AllStudents from './components/AllStudents';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import AddSalesDetails from './components/AddSalesDetails';
import ReadSalesDetails from './components/ReadSalesDetails';
import AddProduct from './components/AddProduct';
import ReadProduct from './components/ReadProduct';
import Adddelivery from './components/Adddelivery';



function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes> {/* Wrap Route components inside Routes */}
          <Route path="/enter" exact element={<AddSalesDetails />} />
          <Route path="/readproduct" exact element={<ReadProduct/>} />
          <Route path="/adddelivery" exact element={<Adddelivery/>} />
          
          <Route path="/addproduct" exact element={<AddProduct/>} />
          <Route path="/add" exact element={<AddStudent />} />
          <Route path="/read" exact element={<ReadSalesDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


const express = require("express");  //Create variable and assign value
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070; //If 8070 not avilable assign another avilalabe port number

app.use(cors());
app.use(bodyparser.json());

const URL = process.env.MONGODB_URL; //connect to mongodb

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
   
});

const connection = mongoose.connection;
connection.once("open",() => {  //Open the created connection
    console.log("MongoDb connection success!");
})

const studentRouter = require("./routes/students.js"); //Add students.js file
const registerRouter = require("./routes/register.js"); // Import your new router
const addproductRouter = require("./routes/addproduct.js");
const adddeliveryRouter = require("./routes/adddelivery.js");


app.use("/student",studentRouter);
app.use("/registermodel", registerRouter);
app.use("/addproductmodel", addproductRouter); // Use the new router
app.use("/adddeliverymodel",adddeliveryRouter);

app.listen(PORT,() => {
    console.log(`server is up and running on port number: ${PORT}`)
})