// Import necessary modules and the Post model
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./postModel');


mongoose.connect('mongodb://0.0.0.0:27017/user').then(res=>{
    console.log('Connected to MongoDB');
}).catch(error=> console.log(error));

const app = express();
app.use(express.json());

// Create a new post
app.post('/posts', async (req, res) => {
    const { title, description, author, tags, status } = req.body;
    
    try {
        const newPost = new Post({ title, description, author, tags, status });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts or a specific post by ID
app.get('/posts/:id?', async (req, res) => {
    try {
        const postId = req.params.id;
        
        if (postId) {
            const post = await Post.findById(postId);
            
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            
            return res.json(post);
        } else {
            const posts = await Post.find();
            return res.json(posts);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Update a post by ID
app.put('/posts/:id', async (req, res) => {
    const { title, description, author, tags, status } = req.body;
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
            { title, description, author, tags, status }, 
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
