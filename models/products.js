const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category_id: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    date:{
        type: String
    },
    supplier:{
        type: String
    },
    code:{
        type: String,
        require: true
    },
    import_price: {
        type: Number,
        require: true
    },
    import_qty: {
        type: Number,
        require: true
    },
    sale_price:{
        type: Number,
        require: true
    },
    stock_qty:{
        type: Number,
        require: true
    },
    desc:{
        type: String
       
    }

});

let Product = module.exports = mongoose.model('Product', ProductSchema);