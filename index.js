const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = 27017

app.get("/", (req, res) => {
    res.send("Local server running...");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

app.get('/managers', (req, res) => {
    dao.findAll()
        .then((documents) => {
         // Process documents
    })
        .catch((error) => {
        // Handle error
    })
})

app.get("/stores",(req,res) => {
    res.send("Stores");
})

app.get("/stores/edit",(req,res) => {
    res.send("Stores Edit");
})

app.get("/products",(req,res) => {
    res.send("Products ");
})