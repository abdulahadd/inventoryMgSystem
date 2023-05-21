const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

const sale = module.exports = mongoose.model('sale', saleSchema);







