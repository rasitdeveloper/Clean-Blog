const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static('public'));

//routes
app.get('/', (req,res) => {
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index');
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.get('/add_post', (req,res) => {
    res.render('add_post');
})

const port = 4000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
})