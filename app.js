const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'atul512191'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var numberOfItems = 1;
var selection=0;

const products = [
  {
    'productID': "1",
    'Name': "Soap",
    'CategoryID': "2",
    'SupplierID': "3",
    'Cost': "12",
    'Units': "100"
  },
  {
    'productID': "2",
    'Name': "Handle",
    'CategoryID': "3",
    'SupplierID': "2",
    'Cost': "16",
    'Units': "90"
  }
];

app.get("/trans", (req, res)=>{
  res.render("transaction", {
    style: "#"
  })
})

app.get("/inv/edit", (req, res)=>{
  res.render("inventoryEdit", {
    style: "#",
    selection: selection
  });
});

app.post("/inv/edit", (req, res)=>{
  const selection=req.body.update;
  console.log(selection);
  res.redirect("/inv/edit");
});
  
app.get("/", (req, res)=>{
  res.render("main", {
    style : "#"
  });
});

app.get("/inv", (req, res)=>{
  res.render("inventory", {
    style: "#",
    numberOfItems: numberOfItems,
    products: products
  });
});

app.get("/dash", (req, res)=>{
  res.render("dashboard", {
    style: "style/dashboard.css"
  });
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});