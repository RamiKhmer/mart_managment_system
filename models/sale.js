const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema({
    no: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    items: {
        type: Array,
        "default": []
    }

});

let Sale = module.exports = mongoose.model('Sale', SaleSchema);