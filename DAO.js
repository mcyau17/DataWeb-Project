const MongoClient = require('mongodb').MongoClient

//connects to the mongo client
MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
        db = client.db('proj2023MongoDB')
        coll = db.collection('managers')
    })
    .catch((error) =>{
        console.log(error.message)
    })

//function to get the data from the mongo db
var findAll = function() {
    return new Promise((resolve, reject) => {
        var cursor = coll.find()
        cursor.toArray()
        .then((documents) => {
            resolve(documents)
        })
        .catch((error) => {
            reject(error)
        })
    })
}  
//function to add to the mongo db
var addManager = function(managers) {
    return new Promise((resolve, reject) => {
        coll.insertOne(managers)
        .then((documents) => {
            resolve(documents)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
    
//exports functions
module.exports = {findAll, addManager};