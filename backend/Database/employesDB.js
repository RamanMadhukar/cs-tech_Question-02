const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        salary: String,
        designation:String

    }
);

module.exports = mongoose.model('Employee2', empSchema);