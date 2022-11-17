const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => { // выдает главную страницу
    res.sendFile(createPath('index'))
});
app.get('/contacts', (req, res) => { // выдает страницу контактов
    res.sendFile(createPath('contacts'))
});

app.get('/about-us', (req, res) =>{ /* make redirect from one
 page to another*/
    res.redirect('/contacts')
});

app.use((req, res) =>{ /* в случае если пользователь введет 
неверный адрес, выдаст страницу ошибки и код ошибки */
    res
    .status(404)
    .sendFile(createPath('error'))
});

