const mongoose = require("mongoose");

const ProCategorySchema = mongoose.Schema({
    name: {
        type:String,
        require: true
    },
    desc: {
        type: String
    }
})

let Category = module.exports = mongoose.model('Category', ProCategorySchema);