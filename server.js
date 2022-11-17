const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

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
    const { title, author, body } = req.body;
    const post = {
        id: new Date(),
        data: (new Date().toLocaleDateString()),
        title,
        author,
        body,
    }
    res.render(createPath('post'), {post, title});
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

