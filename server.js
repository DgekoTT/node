const express = require('express');
const morgan = require('morgan')
const mongoose = require("mongoose");
const postRoutes = require('./routes/post-routes.js');
const contactRoutes = require('./routes/contact-routes.js');
const createPath = require('./helpers/create-path');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://Dgeko:eRR*34w@cluster0.eet0lyq.mongodb.net/node-first?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then((res) => console.log('COnnected to DB'))
    .catch((error) => console.log(error))

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));// Middleware который разрешает доступ к папке со стилями 

app.use(express.urlencoded({ extend: false}));// парсит входяшие запросы 

app.use(methodOverride('_method'));

app.use(postRoutes);

app.use(contactRoutes);

router.use((req, res) =>{ /* в случае если пользователь введет 
неверный адрес, выдаст страницу ошибки и код ошибки */
    const title = 'Error'
    res
    .status(404)
    .sendFile(createPath('error', {title}))
});