const express = require("express");
const router = express.Router();
const Categories = require("../models/pro-category");

router.get("/product-category",async(req, res)=> {
    const catsss = await Categories.find()

    Categories.find((err, categories)=> {
        if(err) return console.log("From Find 1 ",err);
        res.render("categories/product-category", {pageTitle: "Product Category", categories: categories});
    });

    // console.log(catsss[2].name);

});

router.post("/add-category", (req, res)=> {
    const cat = new Categories({
        name: req.body.name,
        desc: req.body.desc
    });
    cat.save(err=> {
        if (err){return console.log(err);}

        res.redirect('/product-category');
    })
});

router.get("/edit-category/:id", (req, res)=> {
    Categories.findById(req.params.id, (err, cat)=> {
        if(err) return console.log("from findByID 2 ", err);
        res.render("categories/edit-product-category",{pageTitle: "Editing Product Category", cat: cat});
    });
    
});

router.post("/edit-category/:id", (req, res)=> {
    Categories.findById(req.params.id, (err, cat)=>{
        if(err) return console.log("Error at update Cat :", err);

        cat.name = req.body.name;
        cat.desc = req.body.desc;

        cat.save((err)=> {
           if(err) return console.log("Error at save Update Cat: ", err);
        });

        res.redirect("/product-category")
    });
});



module.exports = router;