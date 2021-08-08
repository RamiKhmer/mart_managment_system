const express = require("express");
const router = express.Router();

const Product = require("../models/products");
const Rate = require("../models/rate");
const Sale = require("../models/sale");

let arrProducts = [];
let totalAmount = 0;

const sumTotal = function () {
    let total = 0;
    arrProducts.forEach(p => {
        total += p.amount;
    });
    totalAmount = total;
};


router.get("/sale", async (req, res) => {
    const rates = await Rate.find();
    res.render("sale", {
        pageTitle: "Sale",
        products: arrProducts,
        tamount: totalAmount,
        rate: rates[0]
    });
    // console.log(arrProducts);
});

router.post("/buy-product-code", async (req, res) => {

    const products = await Product.find({
        code: req.body.code
    })
    if (products != "") {
        if (products[0].stock_qty > 0 && req.body.qty <= products[0].stock_qty) {
            const pObj = {
                pid: products[0]._id,
                name: products[0].name,
                code: products[0].code,
                price: products[0].sale_price,
                qty: req.body.qty * 1,
                amount: products[0].sale_price * req.body.qty
            }
            arrProducts.push(pObj);
        }
    }

    // Calculate Total Amount for each item

    sumTotal()

    res.redirect("/sale");
    // console.log(products[0]);
});

//  Delete product from array

router.post("/delete-array-product/:index", (req, res) => {
    arrProducts.splice(req.params.index, 1);
    sumTotal()
    res.redirect("/sale");
});

//  Add more qty in array
router.post("/plus-array-product/:index", (req, res) => {
    const ind = req.params.index;
    let qty = arrProducts[ind].qty * 1 + 1;
    let pAmount = arrProducts[ind].price * qty * 1
    // console.log(arrProducts[ind].price);

    arrProducts[ind].qty = qty;
    arrProducts[ind].amount = pAmount;
    sumTotal()

    res.redirect("/sale");
});

router.post("/minus-array-product/:index", (req, res) => {
    const ind = req.params.index;
    let qty = arrProducts[ind].qty * 1 - 1;
    let pAmount = arrProducts[ind].price * qty * 1
    // console.log(arrProducts[ind].price);
    if (qty >= 0) {
        arrProducts[ind].qty = qty;
        arrProducts[ind].amount = pAmount;
        sumTotal()
    }

    res.redirect("/sale");
});

router.post("/check-out", async (req, res) => {
    
    const sale = new Sale({
        no: Math.floor(Date.now() / 1000),
        date: new Date(),
        amount: totalAmount,
        items: arrProducts
    });

    sale.save((err)=> {
        if(err) return console.log("Error from sale product :", err);

        res.redirect("/sale");
    
        arrProducts = [];
        totalAmount = 0;

    })
    // console.log(Math.floor(Date.now() / 1000));
    // res.redirect("/sale");

});

module.exports = router;