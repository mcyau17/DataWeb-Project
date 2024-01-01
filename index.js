var DAO = require('./DAO.js')
var DOAmySQL = require('./DOAmySQL.js')
const express = require('express')
const app = express();
const port = 27017


app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('home');
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

app.get('/managers', (req, res) => {
    DAO.findAll()
        .then(data => {
            res.render('managers', {managers: data});
        })
        .catch(error => {
            console.log("Error: " + error)
        })

})

app.get('/managers/add', (req, res) =>{
     res.render('manageradd');
})
        

app.get("/stores", (req,res) => {
    DOAmySQL.getStore()
    .then(data =>{
        res.render('store', {store: data});
    })
    .catch(error =>{
        console.log("Error: " + error)
    })
})

app.get("/stores/edit",(req,res) => {
    res.send("Stores Edit");
})

app.get("/products",(req,res) => {
    DOAmySQL.getProducts()
    .then(data =>{
        res.render('products', {product: data});
    })
    .catch(error =>{
        console.log("Error: " + error)
    })
})