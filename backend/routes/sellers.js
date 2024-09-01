const router = require("express").Router();
const Seller = require("../models/Seller");






router.route("/add").post((req,res)=>{ //Arrow function

    const firstName = req.body.firstName; //Get front end value as a request through body
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username =  req.body.username;
    const password=req.body.password;
    const country=req.body.country;
    const address=req.body.address;
    const companyName = req.body.companyName;
    const businessAddress = req.body.businessAddress;
    const contactInfo  = req.body.contactInfo;
    const paymentMethod = req.body.paymentMethod;
    const NicDetails = req.body.NicDetails;
    const birthday =req.body.birthday;

    const newSeller = new Seller({//creating Student object
        firstName,
        lastName,
        email,
        username,
        password,
        country,
        address,
        companyName,
        businessAddress,
        contactInfo,
        paymentMethod,
        NicDetails,
        birthday

    })

    newSeller.save().then(()=>{   //pass values to database(Create)
        res.json("Seller Added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

module.exports = router;