const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Post = require('./models/Post');

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//routes
app.get('/', async (req,res) => {
    const post = await Post.find({});
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index', {
        post
    });
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.get('/add_post', (req,res) => {
    res.render('add_post');
})

app.post('/post', async (req,res) => {
    await Post.create(req.body);
    console.log(req.body);
    res.redirect('/');
})


const port = 4000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
})