const express = require('express');
const reportcrime = require('../models/reportcrime');
const router = express.Router();
// add crimereport
router.post("/addreport",(req,res,next) => {
    console.log('chalu')
    reportcrime.create({

       phonenumber:req.body.phonenumber,
       crimedetails:req.body.crimedetails,
       location:req.body.location,
       areapincode:req.body.areapincode
    }).then(() => {
      
        res.json({ status: "Crime  reported!"});
    }).catch(next);
});

//Update crime report
router.put('/updatereport/:id',  (req, res, next) => {
    console.log("chalyo")
 reportcrime.findById(req.params.id)  
 .then((reportcrime)=>{
    reportcrime._id=req.params.id
    reportcrime.phonenumber=req.body.phonenumber
    reportcrime.crimedetails=req.body.crimedetails
    // reportcrime.image=missingperson.image
    reportcrime.location=req.body.location
    reportcrime.areapincode=req.body.areapincode

    reportcrime.save()
    .then((reportcrime)=>{
        res.json(reportcrime)
    }).catch(next)
    })

    });
//Delete crimereport 
    router.delete('/deletereport/:id',  (req, res, next) => {
        reportcrime.findByIdAndDelete(req.params.id)
            .then((reportcrime) => {
                res.json({ status: 'Report deleted!', Report: reportcrime })
            }).catch(next);
    });


    router.get("/getAllCrimes",(req, res, next) => {
        console.log("getAllCrimes")
        reportcrime.find()
            .then((crimes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(crimes);
            }, (err) => next(err))
            .catch((err) => next(err));
      })
    


module.exports = router;