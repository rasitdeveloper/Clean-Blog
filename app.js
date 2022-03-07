const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const methodOverride = require('method-override');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');

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
app.use(methodOverride('_method', {
    methods:['POST', 'GET']
}));

//routes
app.get('/', postController.getAllPosts)
app.get('/post/:id', postController.getPost)
app.post('/post', postController.createPost)
app.put('/post/:id', postController.updatePost)
app.delete('/post/:id', postController.deletePost)

app.get('/add_post', pageController.getAddPage)
app.get('/about', pageController.getAboutPage)
app.get('/post/edit/:id', pageController.getEditPage)



const port = 4000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
})