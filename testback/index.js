const express = require('express');


const app = express();

const port = 4000;

app.get('/', (req,res) => {
    res.send("Hello World")
});

const isLoggedIn = (req,res, next)=>{
    console.log("User Logged In");
    next();
}


const isAdmin = (req,res, next)=>{
    console.log("isAdmin Running");
    next();
}

const admin = (req,res) => {
    res.send("Admin Dashaboard")
}

 

app.get("/admin",isLoggedIn,isAdmin, admin)


app.listen(port, ()=> console.log('Express is running'));