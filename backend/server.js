const express = require("express");  //Create variable and assign value
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const path = require('path');


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


/////////////////////////////////////////////////   routes //////////////////////////////
const itemRouter = require("./routes/items"); 
const sellerRouter = require("./routes/sellers");
const auctionRouter = require("./routes/auctions");
const adminRouter = require("./routes/admins");
const bidderRouter = require("./routes/bidders");
const registerRouter = require("./routes/register.js"); 
const addproductRouter = require("./routes/addproduct.js");
const adddeliveryRouter = require("./routes/adddelivery.js");
const adddeliverypersonRouter = require("./routes/adddeliverypersonroute.js");
const employeeRouter = require("./routes/employees.js");



const salaryRouter = require("../backend/routes/SalaryRoute.js");
const cashRouter = require("../backend/routes/CashRoute.js");
const empRouter = require("../backend/routes/EmployeeRoute.js")

app.use("/item",itemRouter);
app.use("/seller",sellerRouter);
app.use("/auction",auctionRouter);
app.use("/admin",adminRouter);

////////////////////////////////////////////      sahan      ////////////////////////////////////
app.use("/bidder", bidderRouter);
app.use("/employee", employeeRouter); // Add employee routes


///////////////////////////////////////////////      sadun       /////////////////////////////////
app.use("/registermodel", registerRouter);
app.use("/addproductmodel", addproductRouter); // Use the new router
app.use("/adddeliverymodel",adddeliveryRouter);
app.use("/adddeliveryperson",adddeliverypersonRouter);


//////////////////////////////////////////////        supuni            ////////////////////////////



app.use("/salaries", salaryRouter);
app.use("/cash", cashRouter);
app.use("/employee", empRouter);


app.listen(PORT,() => {
    console.log(`server is up and running on port number: ${PORT}`)
})

//back end URL for item list manupulation


//////////////////////////////////////////////////////////////////////////////////
app.use('./uploads', express.static(path.join(__dirname, 'uploads')));