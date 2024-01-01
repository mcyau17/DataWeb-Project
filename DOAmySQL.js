var mysql = require('mysql');


var pool = mysql.createPool({
        connectionLimit : 10,
        host : '127.0.0.1',
        user : 'root',
        password : 'Yausaiwah9952',
        database : 'proj2023'
    });

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

var getProducts = function(){
    return new Promise((resolve, reject) =>{
        pool.query('SELECT * FROM product')
            .then((data) =>{
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = {getStore, getProducts}