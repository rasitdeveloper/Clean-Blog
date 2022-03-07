const Post = require('../models/Post');
exports.getAllPosts = async (req,res) => {
    const post = await Post.find({}).sort('-dateCreated');
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index', {
        post
    });
}

exports.getPost = async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    })
}

exports.createPost = async (req,res) => {
    await Post.create(req.body);
    console.log(req.body);
    res.redirect('/');
}

exports.updatePost = async (req,res) => {
    const post = await Post.findOne({_id: req.params.id});
    post.title = req.body.title;
    post.message = req.body.message;
    await post.save()
    res.redirect(`/post/${req.params.id}`);
}

exports.deletePost = async (req,res) => {
    // const post = await Post.findOne({_id: req.params.id});
    // let deletedPost = __dirname + '/public' + post.image;
    // fs.unlinkSync(deletedPost);
    // await Post.findByIdAndRemove(req.params.id);
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
}