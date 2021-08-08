const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config/database");

const app = express();

// Connect to mongoBD Database
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error: "));
db.once('open', function(){
    console.log("Connected to mongoBD");
});

//  View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  set public folder
app.use(express.static(path.join(__dirname, 'public')));

// The body Parser Middle Ware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Set The Routes
const productCategories = require("./routes/product_category");
const product = require("./routes/product_route");
const dashboard = require("./routes/dashboard_route");
const sale = require("./routes/sale_route");
const rate = require("./routes/rate_route");

app.use(dashboard);
app.use(sale);
app.use(productCategories);
app.use(product);
app.use(rate);

app.get('*', (req, res)=>{
    res.render("404", {pageTitle: "Page Not Found"});
  });

app.listen(3000, ()=>{
    console.log("Server is running on port 3000 at : ", new Date());
});