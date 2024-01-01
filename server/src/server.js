const express = require("express")
const app = express()
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000; // server 
const cors = require("cors") // For frontend connection

dotenv.config();

const db = require("./connectDB")

// Ochrana Backendu
const jwtMiddleware = require('./middleware/jwtMiddleware'); 

app.use(express.json({extended:false})); // 2,5 Midleware for easy Routes
app.use(jwtMiddleware.verifyToken.unless({ path: ['/','/login',`/registration`] })); // musí byt zde, nad ostatními app.

// app.use("/",cors());
app.use(cors());
// ---------------------------------

// Routy - načtení
const registration = require("./routes/user/registration")
const login = require("./routes/user/login")

const getPost = require("./routes/posts/getPosts")
const postPost = require("./routes/posts/postPost")
const putPost = require("./routes/posts/putPost.js")
const deletePost = require("./routes/posts/deletePost.js")

const postComment = require("./routes/comments/postComment")
const getComment = require("./routes/comments/getComments.js")
const putComment = require("./routes/comments/putComment.js")
const deleteComment = require("./routes/comments/deleteComment.js")


// Index
app.get("/",(req,res) => { // 1 server 
    res.send("Hlavni stranka");
});
app.listen(PORT, (err) => { // 1 server 
    console.log(`Server běží na portu ${PORT}!`);
});

// ----------------------
// Routes use
db.connect(); // 2 connectDB

app.use("/", registration);
app.use("/", login);

app.use("/", getPost)
app.use("/", postPost)
app.use("/", putPost)
app.use("/", deletePost)

app.use("/", postComment)
app.use("/", getComment)
app.use("/", putComment)
app.use("/", deleteComment)

