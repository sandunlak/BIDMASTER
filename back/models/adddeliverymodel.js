// adddeliverymodel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addDeliverySchema = new Schema({
    productId: {
        type: String, // Adjust the type if necessary
        required: true,
    },
    dDate: {
        type: String,
        required: true,
    },
    dTime: {
        type: String,
        required: true,
    },
    dStates: {
        type: String,
        required: true,
    },
});

const AddDelivery = mongoose.model("AddDelivery", addDeliverySchema);

module.exports = AddDelivery;
