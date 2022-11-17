const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

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
    res.render(createPath( 'posts'), {title});
});

app.get('/posts', (req, res) => {
    const title = 'Post'
    res.render(createPath('posts'), {title});
});

app.get('/add-post', (req, res) => {
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

