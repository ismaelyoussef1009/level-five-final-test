// postModel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    tags: [String],
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
