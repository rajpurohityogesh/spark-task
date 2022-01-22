

//...................................Developed By : RAJPUROHIT YOGESH SINGH..........................................



//..........................................Dependencies Requirement..........................................



const express = require('express');
const app = express();
// const path = require("path");
// const expressHandlebars= require("express-handlebars");
const bodyParser = require("body-parser");
const { Router } = require('express');


const database = require(__dirname+"/model/index.js");

let port = process.env.PORT;
if(port==null || port =="") {
    port =3000;
}

var currentUserAcc;
var currentUserName ;


var userAcc;




//..........................................Static Files  & Dependencies Uses..........................................




app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended : true }));

app.set('view engine', "ejs");




//..........................................GET requests..........................................




app.get('/', (req, res) => {
    database.allUserName().then((cust_data)=>{
        res.render("index" , { var_data:cust_data , heading:"Home Page" });
    });
});

app.get("/home",(req,res)=>{
    database.myData(currentUserAcc).then((my_data)=>{
        res.render("home", { var_my:my_data , heading:"Customer"});
    });
});


app.get("/all_cust",(req,res)=>{
    database.allUserData().then((cust_data)=>{
        res.render("all_cust" , { var_cust : cust_data , heading:"All Customers" });
    });
});


app.get("/my_activity",(req,res)=>{
    database.actData().then((my_act)=>{
        res.render("my_activity" , { var_act : my_act , heading:"All Transactions" });
    });
});


app.get("/transfer",(req,res)=>{
    let temp = "";
    res.render("transfer",{ accDf:temp , heading:"Transfer Money" });
});


app.get("/show",(req,res)=>{
    database.userData(userAcc).then((my_data)=>{
        res.render("show" , { var_my:my_data , heading:"User Profile" });
    });
})


app.get("/transfer-to",(req,res)=>{
    let temp = "value="+ userAcc ;
    res.render("transfer",{ accDf:temp , heading:"Transfer Money"});
});




//..........................................POST requests..........................................



app.post("/home",(req,res)=>{
    currentUserAcc = req.body.curCustomer;
    res.redirect("/home");
});


app.post("/transfer",(req,res)=>{
    database.updateData(req.body.res_acc,req.body.res_amount);
    res.redirect("/home");
});

app.post("/all_cust",(req,res)=>{
    userAcc = req.body.accNo;
    res.redirect("/show");
})



//..........................................app listening..........................................




app.listen(port, () => console.log("Banking app listening on "+ port+ " port!"));
