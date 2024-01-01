var DAO = require('./DAO.js')
var DOAmySQL = require('./DOAmySQL.js')
const express = require('express')
const app = express();
const port = 27017
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
var pool;   


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))

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

app.post('/managers/add', (req, res) =>{
    if(req.body.id.length != 4 ){  
        console.log("Error: Manager Id must be exactly 4 characters")
        res.redirect('/managers/add?error+ ' + encodeURI("Manager ID must be 4 characters"))
        return;
    }
    if(req.body.name.length < 5 ){  
        console.log("Error: name must be greater than 5 characters")
        res.redirect('/managers/add?error+ ' + encodeURI("Name must be greater than 5 characters"))
        return;
    }

   DAO.addManager({_id:req.body.id, 
    name:req.body.name, 
    salary:req.body.salary})
        .then((data) => {
            res.redirect('/managers')
        })
        .catch(error => {
            console.log("Error: " + error)
            res.redirect('/managers')
        })

        console.log(req.body._id)
})

app.get("/stores", (req,res) => {
    DOAmySQL.getStore()
    .then(data =>{
        res.render('stores', {store: data});
    })
    .catch(error =>{
        console.log("Error: " + error)
    })
})

app.get("/stores/edit/:sid",(req,res) => {
    res.send("Stores Edit");
})

app.get("/stores/add", (req, res)=>{
    res.render('storeadd')
})

app.post("/stores/add", (req, res) =>{
    if(req.body.mgrid.length != 4){
        console.log("Error: Manager Id must be exactly 4 characters")
        res.redirect('/stores/add?error+ ' + encodeURI("Manager ID must be 4 characters"))
        return;
    }

    DOAmySQL.addStore(req.body.sid, req.body.location, req.body.mgrid)
        .then((data) =>{
            res.redirect('/stores');
        })
        .catch(error =>{
            console.log("Error: " + error);
            res.redirect('/stores');
        })
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

app.get("/products/delete/:pid", (req, res) =>{

})