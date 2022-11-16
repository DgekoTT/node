const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('Server is requested');
    console.log(req.url, req.method);
     
    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

    let basePath = ''

    switch(req.url){
        case '/':
            basePath = createPath('index');
            break;
        case '/contacts':
            basePath = createPath('contacts');
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }
    fs.readFile(basePath , (err, data) =>{
        if (err) {
            console.log.apply(err);
            res.statusCode = 500;
            res.end();
            } 
        else {
            res.write(data);
            res.end();
            }
        })
});


server.listen(3000, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
});