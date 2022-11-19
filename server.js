const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mongoose = require("mongoose");
const Post = require('./models/post')
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://Dgeko:eRR*34w@cluster0.eet0lyq.mongodb.net/node-first?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then((res) => console.log('COnnected to DB'))
    .catch((error) => console.log(error))

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));// Middleware который разрешает доступ к папке со стилями 

app.use(express.urlencoded({ extend: false}));// парсит входяшие запросы 

app.get('/', (req, res) => { // выдает главную страницу
    const title = 'Home';
    res.render(createPath('index'), {title});
});
app.get('/contacts', (req, res) => { // выдает страницу контактов
    const title = 'Contacts';
    const contacts = [
        {name: 'YouTube', link: 'https://www.youtube.com/watch?v=tlUcmD0zPI4'},
        {name: 'GitHub', link: 'https://github.com/DgekoTT'},
    ];
    res.render(createPath('contacts'), {contacts, title}  );
});


app.get('/posts/:id', (req, res ) => {
    const title = 'Post'
    const post = {
        id: '1',
        text: 'initial part',
        title: 'Post title',
        date: '17.11.22',
        author: 'Jhohan',
    };
    res.render(createPath('post'), {title, post});
});

app.get('/posts', (req, res) => {
    const title = 'Post'
    const posts =[ {
        id: '1',
        text: 'initial part',
        title: 'Post title',
        date: '17.11.22',
        author: 'Jhohan',
    }];
    res.render(createPath('posts'), {title, posts});
});

app.post('/add-post', (req, res) => { // добавляет пост на сайт
    const { title, author, text } = req.body;
    const post = new Post({title, author, text});
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'Error'})
        })
});

app.get('/add-post', (req, res) => { // получем страницу добавления на сайт 
    const title = 'Add post'
    res.render(createPath('add-post'), {title});
});

app.get('/about-us', (req, res) =>{ /* make redirect from one
 page to another*/
    res.redirect('/contacts')
});

app.use((req, res) =>{ /* в случае если пользователь введет 
неверный адрес, выдаст страницу ошибки и код ошибки */
    const title = 'Error'
    res
    .status(404)
    .sendFile(createPath('error', {title}))
});

