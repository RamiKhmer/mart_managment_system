const mongoose = require("mongoose");

const RateSchema = mongoose.Schema({
    dolla_rial: {
        type: Number,
        require: true
    },
    dolla_bath: {
        type: Number,
        require: true
    },
    codeId: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
});

let Rate = module.exports = mongoose.model('Rate', RateSchema);