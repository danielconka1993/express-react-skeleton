const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000; // server 
const cors = require("cors") // For frontend connection

const db = require("./connectDB")

app.use(express.json({extended:false})); // Middleware - HTTP request body processingHTTP request body processing, in format.json

app.use("/",cors());

app.get("/",(req,res) => { // 1 server 
    res.send("Hlavni stranka");
});
app.listen(PORT, (err) => { // 1 server 
    console.log(`Server běží na portu ${PORT}!`);
});

// ----------------------
// Routes use
db.connect(); // 2 connectDB

