let express = require("express");
//let mongoose = require("mongoose")
let { MongoClient } = require("mongodb");

let myApp = express();
let db;

// let connectionString = "mongodb+srv://todoAppUser:sam23456789 @cluster0.bbsfn.mongodb.net/TodoApp?retryWrites=true&w=majority"
// mongoose.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
//     db = client.db()
//     myApp.listen(3000)
// });

//let uri = "mongodb+srv://todoAppUser:sam23456789@cluster0.bbsfn.mongodb.net/TodoApp?retryWrites=true&w=majority";
//let Estring = "mongodb+srv://todoAppUser:sam123456789@cluster0.bbsfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//let Estring = "mongodb+srv://todoAppUser:sam123456789@cluster0.bbsfn.mongodb.net/TodoApp?retryWrites=true&w=majority";
let Estring = "mongodb://127.0.0.1:27017/TodoApp"

MongoClient.connect(Estring, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Connection failed for some reason");
    } else {
        console.log("Connection established - All well");
        db = client.db();
        myApp.listen(3000);
    }
});

myApp.use(express.urlencoded({ extended: false }));

myApp.get("/", function(req, res) {
            db.collection('todo').find().toArray(function(err, items) {
                        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do App</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
        <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App!!</h1>
            
            <div class="jumbotron p-3 shadow-sm">
            <form action='/create-item' method='POST'>
                <div class="d-flex align-items-center">
                <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                <button class="btn btn-primary">Add New Item</button>
                </div>
            </form>
            </div>
            
            <ul class="list-group pb-5">
            ${items.map(function(item) {
            return `
                <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text">${item.text_f}</span>
                    <div>
                    <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button class="delete-me btn btn-danger btn-sm">Delete</button>
                    </div>
                 </li>
            `
            }).join('')}
            </ul>
            
        </div>
        
        </body> 
    </html>
        `);
    })
});

myApp.post("/create-item", function(req, res) {
    db.collection("todo").insertOne({ text_f: req.body.item }, function() {
        res.redirect('/')
    });
});