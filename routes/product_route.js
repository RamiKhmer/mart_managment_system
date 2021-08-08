const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const Categories = require("../models/pro-category");
var dateFormat = require('dateformat');
var now = new Date();

router.get("/products", async(req, res)=> {
    const products = await Product.find();
    res.render("products/products", {pageTitle: "View Products", products: products})
});

router.get("/view-product/:id", async(req, res)=> {
    Product.findById(req.params.id, (err, pro)=>{
        if(err) return console.log("Error from view detail product :", err);

        res.render("products/view-product", {pageTitle: "View Product Detail", pro: pro})
    })
});

router.get("/import-product", async(req, res)=> {
    const cats = await Categories.find();
    res.render("products/import-product", {pageTitle: "Import Product", cats: cats});
});

router.post("/import-product", async(req, res)=> {
    const cat = await Categories.findById(req.body.category_id)

    const product = new Product({
        name:        req.body.name,
        category_id: req.body.category_id,
        category: cat.name,
        date:        dateFormat(now, "dS mm, yyyy, h:MM TT"),
        supplier:    req.body.supplier,
        code:        req.body.code,
        import_price: Number(req.body.import_price),
        import_qty:  Number(req.body.import_qty),
        sale_price:  Number(req.body.sale_price),
        stock_qty:   Number(req.body.import_qty),
        desc:        req.body.desc,
    });

    product.save((err)=> {
        if(err) return console.log("Error from save product :", err);

        res.redirect("/import-product");
    })
});

router.get("/edit-product/:id", async(req, res)=> {
    const cats = await Categories.find();
    Product.findById(req.params.id, (err, pro)=>{
        if(err) return console.log("Error from get edit product :", err);
        res.render("products/edit-product", {pageTitle: "Edit Product", cats: cats, pro:pro});
    });
});

router.post("/edit-product/:id", async(req, res)=> {
    const cat = await Categories.findById(req.body.category_id)

    Product.findById(req.params.id, (err, pro)=>{
        if(err) return console.log("error from post edit product", err);

        pro.name =      req.body.name;
        pro.category_id = req.body.category_id;
        pro.category= cat.name;
        pro.supplier=    req.body.supplier;
        pro.code =    req.body.code;
        pro.sale_price =  Number(req.body.sale_price);
        pro.desc = req.body.desc;

        pro.save((err)=> {
            if(err) return console.log("Error from post edit product :", err);
    
            res.redirect("/products");
        })
    });
});

router.get("/product-stockcut", async(req, res)=> {
    const products = await Product.find();
    res.render("products/view_cut_product", {pageTitle: "Products Quantity Cut", products: products})
});

router.get("/cut-product/:id", async(req, res)=>{
    Product.findById(req.params.id, (err, pro)=>{
        if(err) return console.log("Error from get edit product :", err);
        res.render("products/cut_product", {pageTitle: "Cutting Product Stock Quantity", pro:pro});
    });
});

router.post("/cut-product/:id", async(req, res)=>{
    Product.findById(req.params.id, (err, pro)=>{
        if(err) return console.log("Error from get edit product :", err);
        pro.stock_qty = pro.stock_qty - Number(req.body.cutNum);
        pro.save((err)=> {
            if(err) return console.log("Error from post cut product product :", err);
    
            res.redirect("/product-stockcut");
        })
    });
});



module.exports = router;