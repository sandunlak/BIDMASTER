const router = require("express").Router();
let Item = require("../models/item");
const multer = require('multer');
const path = require('path');


const storage = multer.memoryStorage(); // Store image in memory as a buffer
const upload = multer({ storage: storage });

router.route("/add").post(upload.array('images', 10), (req, res) =>
    {

    const name = req.body.name;
    const startingPrice = req.body.startingPrice;
    const description = req.body.description;
    // const image = req.body.image;
    const category = req.body.category;

    const brand = req.body.brand;
    const features = req.body.features;
    const material = req.body.material;
    const condition = req.body.condition;

   // Prepare image data for saving in the database
   const images = req.files.map(file => ({

    data: file.buffer, // Binary data of the image
    contentType: file.mimetype // MIME type of the image

    }));

    const newItem = new Item({
        name,
        startingPrice,
        description,
        images,
        category,

        brand,
        features,
        material,
        condition
    })

    newItem.save().then(()=>{   //pass values to database(Create)
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    }) 

})


// router.route("/").get((req,res)=>{
//     Item.find().then((items)=>{
//         res.json(items)
//         }).catch((err)=>{
//             console.log(err);
//             })
// })

// Route to get items with optional category filter
router.route("/").get((req, res) => {
    const { category } = req.query; // Get the category from query params

    let filter = {};
    if (category) {
        filter.category = category; // Filter items by category
    }

    Item.find(filter).then((items) => {
        // Convert each image buffer to a base64 string
        const itemsWithBase64Images = items.map(item => ({
            ...item._doc, // Include all other fields
            images: item.images.map(image => ({
                data: `data:${image.contentType};base64,${image.data.toString('base64')}`
            }))
        }));
        res.json(itemsWithBase64Images); // Send the filtered items back
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch items" });
    });
});






module.exports = router;