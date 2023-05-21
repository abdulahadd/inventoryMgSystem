const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
   
    supplier: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    
    total_products:{
        type: Number,
        required: true
    },
    
    modelNo: {
        type: String,
        required: true
    },
   
    cost: {
        type: Number,
        required: true
    },
  
});

const stock = module.exports = mongoose.model('stock', stockSchema);







