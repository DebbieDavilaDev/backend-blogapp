import express from 'express';
import cors from 'cors';
import { MongoClient} from 'mongodb';

import '.env/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
const db =client.db('blogapp-c12')
const blogPosts = db.collection('blog-posts')

client.connect()
console.log('Connected to Mongo')

app.get('/', async (req, res) => {


    const allPosts = await blogPosts.find().toArray()
    console.log('allPosts ->', allPosts)
    res.send(allPosts)
   // res.json('here are some blog posts, not yet!🦋')
})


app.post('/', async (req, res) => {
    console.log('req.body ->', req.body)
    const newBlogPost = {title: req.body.title, content: req.body.content}
    // const addedItem = await blogPosts.insertOne(newBlogPost)
    // res.send(addedItem)
    const addedItem = await blogPosts.insertOne(newBlogPost)
    console.log('addedIem ->', addedItem)
    res.send(addedItem)
})


app.listen('8080', ()=> console.log('Api listening on port 8080 😎'))

