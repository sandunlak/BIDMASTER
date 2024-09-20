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