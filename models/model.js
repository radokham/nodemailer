const mongoose = require('mongoose');

const NodemailerSchema = mongoose.Schema({
    nom: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('nodemailer', NodemailerSchema);