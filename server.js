const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mongoose = require("mongoose");
const Post = require('./models/post')
const Contact = require('./models/contacts');
const { methods } = require('expres');
const methodOverride = require('method-override')
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

app.use(methodOverride('_method'));

app.get('/', (req, res) => { // выдает главную страницу
    const title = 'Home';
    res.render(createPath('index'), {title});
});
app.get('/contacts', (req, res) => { // выдает страницу контактов
    const title = 'Contacts';
    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts, title}  ))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'Error'})
        });
});

app.get('/edit/:id', (req, res ) => {
    const title = 'Edit Post'
    Post
        .findById(req.params.id)
        .then((post) =>  res.render(createPath('edit-post'), {post, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error'})
        });
});

app.get('/posts/:id', (req, res ) => {
    const title = 'Post'
    Post
        .findById(req.params.id)
        .then((post) =>  res.render(createPath('post'), {title, post}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error'})
        });
});



app.delete('/posts/:id', (req, res ) => {
    const title = 'Post'
    Post
        .findByIdAndDelete(req.params.id)
        .then((result) =>  res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error'})
        });
});

app.get('/posts', (req, res) => {
    const title = 'Posts'
    Post
        .find()
        .sort({created_at: -1})
        .then((posts) =>  res.render(createPath('posts'), {posts, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'Error'})
        });
});

app.post('/add-post', (req, res) => { // добавляет пост на сайт
    const { title, author, text } = req.body;
    const post = new Post({title, author, text});
    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'Error'})
        });
    
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

