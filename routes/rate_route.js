const express = require("express");
const { isEmptyObject } = require("jquery");
const router = express.Router();
const Rate = require("../models/rate");

const rateCodeId = 12345;

router.get("/money-rate", async (req, res) => {
    let getRate = await Rate.find({codeId:rateCodeId});
    if(getRate==""){
        getRate[0] = "";
    }
    res.render("rate/money-rate", {
        pageTitle: "Money Rate", 
        rate: getRate[0]
    });
    // console.log(getRate);
});

router.post("/money-rate", async (req, res) => {
    let bodyData = req.body;
    const getRate = await Rate.find();
    // console.log(getRate);
    if (getRate == "") {
        const rate = new Rate({
            dolla_rial: Number(bodyData.dolla_rial) ,
            dolla_bath: Number(bodyData.dolla_bath),
            codeId: rateCodeId,
            date: new Date()
        });

        rate.save(err => {
            if (err) return console.log("error from rate save 1 : ", err);
            res.redirect("/money-rate");
        });

    } else {
        Rate.findById(getRate[0]._id, (err, r)=>{
            r.dolla_rial = Number(bodyData.dolla_rial);
            r.dolla_bath = Number(bodyData.dolla_bath);
            r.date = new Date();
            r.save(err => {
                if (err) return console.log("error from rate save 1 : ", err);
                res.redirect("/money-rate");
            });
        })
    }
});


module.exports = router;