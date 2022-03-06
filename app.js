const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Post = require('./models/Post');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

//routes
app.get('/', async (req,res) => {
    const post = await Post.find({}).sort('-dateCreated');
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index', {
        post
    });
})

app.get('/post/:id', async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    })
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

app.get('/post/edit/:id', async (req,res) => {
    const post = await Post.findOne({_id: req.params.id})
    res.render('edit', {
        post
    });
})

app.put('/post/:id', async (req,res) => {
    const post = await Post.findOne({_id: req.params.id});
    post.title = req.body.title;
    post.message = req.body.message;
    await post.save()
    res.redirect(`/post/${req.params.id}`);
})


const port = 4000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
})