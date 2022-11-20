const express = require('express')
const Contact = require('../models/contacts');
const router = express.Router();
const createPath = require('./helpers/create-path')

router.get('/contacts', (req, res) => { // выдает страницу контактов
    const title = 'Contacts';
    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts, title}  ))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'Error'})
        });
});

module.exports = router;