
const router = require("express").Router();
const Item = require("../models/item");
const multer = require('multer');

// Memory storage for images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to add a new item
router.route("/add").post(upload.array('images', 10), async (req, res) => {
    try {
        const { name, startingPrice, description, category, brand, features, material, condition,seller } = req.body;

        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
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
            condition,
            seller
        });

        const savedItem = await newItem.save();

        res.status(201).json({
            message: "Item added successfully",
            itemId: savedItem._id
        });

    } catch (err) {
        res.status(500).json({
            message: "Error adding item",
            error: err.message
        });
    }
});


// Route to get items with optional filters
router.get('/', async (req, res) => {
    try {
        const { search, category, brand, minPrice, maxPrice } = req.query;

        let filter = {};
        
        if (search) {
            filter.name = { $regex: search, $options: "i" }; // case-insensitive search
        }
        if (category) {
            filter.category = category;
        }
        if (brand) {
            filter.brand = brand;
        }
        if (minPrice || maxPrice) {
            filter.startingPrice = {
                ...(minPrice && { $gte: Number(minPrice) }),
                ...(maxPrice && { $lte: Number(maxPrice) })
            };
        }

        const items = await Item.find(filter);

        const itemsWithBase64Images = items.map(item => ({
            ...item._doc,
            images: item.images.map(image => ({
                data: `data:${image.contentType};base64,${image.data.toString('base64')}`
            }))
        }));

        res.json(itemsWithBase64Images);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



// Route to delete an item by name
router.delete('/delete/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const deletedItem = await Item.findOneAndDelete({ name });

        if (!deletedItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json({
            message: "Item deleted successfully",
            itemName: name
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting item",
            error: err.message
        });
    }
});

module.exports = router;
