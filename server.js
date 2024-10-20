const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Post = require('./models/posts.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:8080'}));


mongoose.connect(process.env.DATABASE_URL, { })
    .then(() => {
        app.listen(8000, () => console.log('Server running at http://localhost:8000/'));
    })
    .catch(err => console.error(err));


app.get('/blogs', async (req, res) => {
    try {
        const posts = await Post.find();
        res.setHeader('Content-Type', 'application/json');
        res.send(posts);
    }
    catch(err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.get('/blogs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if(!post){
            res.status(404).send('Post not found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.post('/blogs/create', async (req, res) => {
    try {
        const new_entry = new Post(req.body);
        const post = await new_entry.save();

        if (!post) {
            res.status(500).send('Server Error');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(post._id);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.put('/blogs/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await req.body;
        await Post.findByIdAndUpdate(_id, {title: data.title, content: data.content});
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});


app.delete('/blogs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.use((res,req)=>{
    res.status(404).send('Not Found');
})