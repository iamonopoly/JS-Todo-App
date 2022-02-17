// const {
//     mongodb
// } = require('mongodb')

// //let db
// let connectionString = "mongodb+srv://todoAppUser:sam23456789 @cluster0.bbsfn.mongodb.net/TodoApp?retryWrites=true&w=majority"
// mongodb.connect(connectionString, { useNewUrlParser: true }, () => {
//     console.log('client')
// });
let { MongoClient } = require("mongodb");
//let uri = "mongodb+srv://todoAppUser:sam23456789@cluster0.bbsfn.mongodb.net/TodoApp?retryWrites=true&w=majority";
//let Estring = "mongodb+srv://todoAppUser:sam123456789@cluster0.bbsfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let Estring = "mongodb://127.0.0.1:27017/TodoApp"
let db

MongoClient.connect(Estring, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Connection failed for some reason");
    } else {
        console.log("Connection established - All well");
        db = client.db();
    }


});