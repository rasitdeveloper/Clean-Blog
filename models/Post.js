const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const postSchema = new Schema({
    title: String,
    message: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const post = mongoose.model('post', postSchema)

module.exports = post