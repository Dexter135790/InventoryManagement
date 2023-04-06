const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require('mysql2');

//Connecting to mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'atul512191',
  database : 'inventoryManagement'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server!');
});



let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var selection = 0;

app.get("/trans", (req, res)=>{
  res.render("transaction", {
    style: "#"
  })
})

app.get("/inv/edit", (req, res)=>{
  connection.query("Select product_id from products", (error, results, fields) => {
    if (error) throw error;
    let length = results.length;
    res.render("inventoryEdit", {
      style: "#",
      selection: selection,
      results: results,
      length: length
    });
    })
  
});

app.post("/inv/edit", (req, res)=>{
  const up=req.body.update;
  const del = req.body.del;
  const new1 = req.body.new;

  if(up == 1){
    selection=up;
  }else if(new1==2){
    selection = new1;
  }else if(del == 3){
    selection = del;
  }

  res.redirect("/inv/edit");
});
  
app.get("/", (req, res)=>{
  res.render("main", {
    style : "#"
  });
});

app.post("/addItem", (req, res)=>{
  const name = req.body.name;
  const category = req.body.category;
  const supplier = req.body.supplier;
  const cost = req.body.cost;
  const Units = req.body.Units;

  const item = {
    name: name,
    Category_ID: category,
    Supplier_id: supplier,
    cost: cost,
    Units: Units
  };

  connection.query(`INSERT INTO products (Name, Category_ID, Supplier_ID, Cost, Units) VALUES ('${name}', ${category}, ${supplier}, ${cost}, ${Units})`,(err, results, fields) => {
    if (err) {
      console.error('error inserting record: ' + err.stack);
      return;
    }
    console.log('record inserted');
    res.redirect("/inv");
  });

});

app.post("/updateItem", (req, res)=>{
  const column = req.body["category-selection"];
  const value = req.body["value-input"];
  const id = req.body["id-selection"];
  console.log(column);
  console.log(value);
  console.log(id);

  connection.query(`UPDATE products SET ${column} = '${value}' WHERE PRODUCT_ID = ${id}`,(err, results, fields) => {
    if (err) {
      console.error('error updating record: ' + err.stack);
      return;
    }
    console.log('record updated');
    res.redirect("/inv");
  });

})

app.post("/deleteItem", (req, res)=>{
  const id = req.body["id-selection"];
  console.log(id);

  connection.query(`DELETE FROM products WHERE PRODUCT_ID = ${id}`, (err, results, fields)=>{
    if (err) {
      console.error('error deleting record: ' + err.stack);
      return;
    }
    console.log('record deleted');
    res.redirect("/inv");
  });
});

app.get("/inv", (req, res)=>{

  var resultSet;
  var length;

  connection.query('SELECT * FROM products', (error, results, fields) => {
    if (error) throw error;
    resultSet = results;
    length = results.length;
    // console.log('The solution is: ', results);
    res.render("inventory", {
      style: "#",
      numberOfItems: length,
      products: results
    });
  });
});

app.get("/dash", (req, res)=>{
  const id = 1;
  connection.query(`SELECT * FROM USER_INFORMATION WHERE USERID = ${id}`, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    res.render("dashboard", {
      style: "style/dashboard.css",
      companyName: results[0]["Company_name"],
      userID: results[0]["Userid"],
      Email: results[0]["Email"],
      Password: results[0]["Password"],
      Phone_number: results[0]["Phone_number"],
      city: results[0]["city"],
      state: results[0]["state"],
      country: results[0]["country"]
    });
  });
  
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});

