var mysql = require('promise-mysql');
var pool;
//creates the sql pool
mysql.createPool({
        connectionLimit : 10,
        host : '127.0.0.1',
        user : 'root',
        password : 'Yausaiwah9952',
        database : 'proj2023'
    })
        .then(p =>{
            pool = p
            console.log("pool created")
        })
        .catch(e => {
            console.log("Pool error: " + e)
        })

//function to select the store db
var getStore = function() {
    return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM store')
        .then((data) => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

//function to add data to the store db
var addStore = function(sid, location, mgrid){
    return new Promise((resolve, reject) =>{
        pool.query('INSERT INTO store (sid, location, mgrid) VALUES  (?, ?, ?)', [sid, location, mgrid])
            .then((data) =>{
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
//function to select the products db
var getProducts = function(){
    return new Promise((resolve, reject) =>{
        pool.query('SELECT p.pid, p.productdesc, ps.sid, s.location, ps.Price FROM product p LEFT JOIN product_store ps ON p.pid = ps.pid LEFT JOIN store s ON ps.sid = s.sid')
            .then((data) =>{
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
} 
//exports functions
module.exports = {getStore, addStore, getProducts}