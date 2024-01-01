//Imports anything needed
var DAO = require('./DAO.js')
var DOAmySQL = require('./DOAmySQL.js')
const express = require('express')
const app = express();
const port = 27017
const bodyParser = require('body-parser')

//lets the app view ejs files
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))

//home page
app.get("/", (req, res) => {
    res.render('home');
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

//Displays the managers
app.get('/managers', (req, res) => {
    DAO.findAll()
        .then((data) => {
            res.render('managers', {managers: data});
        })
        .catch((error) => {
            console.log("Error: " + error)
        })

})

//displays the manager add page
app.get('/managers/add', (req, res) =>{
     res.render('manageradd');
})

//adds the new manager to the DB
app.post('/managers/add', (req, res) =>{
    //Checks if the manager ID is the right length
    if(req.body.id.length != 4 ){  
        console.log("Error: The inputted ID needs to be equal to 4")
        res.redirect('/managers/add?error+ ' + encodeURI("The inputted ID needs to be equal to 4"))
        return;
    }
    //Checks if the name is the right length
    if(req.body.name.length < 5 ){  
        console.log("Error: The inputted name must be greater than 5 characters")
        res.redirect('/managers/add?error+ ' + encodeURI("The inputted name must be greater than 5 characters"))
        return;
    }

    //adds the new maanger
   DAO.addManager({_id:req.body.id, 
    name:req.body.name, 
    salary:req.body.salary})
        .then((data) => {
            res.redirect('/managers')
        })
        .catch((error) => {
            console.log("Error: " + error)
            res.redirect('/managers')
        })

        console.log(req.body._id)
})

//Displays the stores page
app.get("/stores", (req,res) => {
    DOAmySQL.getStore()
    .then((data) =>{
        res.render('stores', {store: data});
    })
    .catch((error) =>{
        console.log("Error: " + error)
    })
})
//displays the store add page
app.get("/stores/add", (req, res)=>{
    res.render('storeadd')
})

//adds the new store
app.post("/stores/add", (req, res) =>{
    //makes sure the mgrid is the right length
    if(req.body.mgrid.length != 4){
        console.log("Error: The inputted ID needs to be equal to 4")
        res.redirect('/stores/add?error+ ' + encodeURI("The inputted ID needs to be equal to 4"))
        return;
    }

    //adds the new store
    DOAmySQL.addStore(req.body.sid, req.body.location, req.body.mgrid)
        .then((data) =>{
            res.redirect('/stores');
        })
        .catch((error) =>{
            console.log("Error: " + error);
            res.redirect('/stores');
        })
})

//displays the products page
app.get("/products", (req,res) => {
    DOAmySQL.getProducts()
    .then((data) =>{
        res.render('products', {product: data});
    })
    .catch((error) =>{
        console.log("Error: " + error)
    })
})