const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        default: "1234"
    },

    isStaff: {
        type: Boolean,
    },

    isManager: {
        type: Boolean,
    }

})

module.exports = mongoose.model('Users', userSchema);