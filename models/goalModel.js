const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    entryDate: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Goals', goalSchema);