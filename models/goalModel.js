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
    },
    category: {
        type: Object,
      
    },

    status: {
        type: String,
        default: "Incomplete"
    },



})

module.exports = mongoose.model('Goals', goalSchema);