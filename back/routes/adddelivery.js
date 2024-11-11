// adddelivery.js
const express = require("express");
const router = express.Router();
const AddDeliveryModel = require("../models/adddeliverymodel");

// Endpoint for adding or updating a delivery
router.post("/adddelivery", (req, res) => {
    const { productId, dDate, dTime, dStates } = req.body;

    const newDelivery = {
        productId,
        dDate,
        dTime,
        dStates,
    };

    // Check if the delivery already exists
    AddDeliveryModel.findOneAndUpdate({ productId }, newDelivery, { upsert: true, new: true })
        .then(() => {
            res.json("Delivery record added/updated");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to add/update delivery record" });
        });
});

// Endpoint for reading a delivery by product ID
router.get("/readdelivery/:productId", (req, res) => {
    const { productId } = req.params;
    AddDeliveryModel.findOne({ productId })
        .then((delivery) => {
            res.json(delivery);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch delivery" });
        });
});

// Endpoint for reading all deliveries (if needed)
router.get("/readdelivery", (req, res) => {
    AddDeliveryModel.find()
        .then((deliveries) => {
            res.json(deliveries);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch deliveries" });
        });
});

module.exports = router;
