const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsShema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
});

const Contact = mongoose.model('Contact', contactsShema );

module.exports = Contact;