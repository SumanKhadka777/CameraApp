const express = require('express');
const Missingperson = require('../models/missingperson');
const router = express.Router();
const missing = require('../auth')

//Update missing person data
router.put('/updatemissing/:id',  (req, res, next) => {
  Missingperson.findById(req.params.id)  
  .then((missingperson)=>{
     missingperson._id=req.params.id
     missingperson.fullname=req.body.fullname
     missingperson.address=req.body.address
     missingperson.image=missingperson.image
     missing.description=req.body.description
     missingperson.missingstatus=missingperson.missingstatus

     missingperson.save()
     .then((missingperson)=>{ 
         res.json(missingperson)
     }).catch(next)
     })

     });    

// getmissing person id
router.get('/getmissing/:id', (req, res, next) => {
    Missingperson.findById(req.params.id)
        .then((Missingperson) => {
           
            res.json({ fullname: Missingperson.fullname, address: Missingperson.address, description: Missingperson.description,missingstatus: Missingperson.missingstatus });
        })
    });


//add missing person
router.post("/addmissingperson",(req,res,next) => {
    Missingperson.create({
        fullname:req.body.fullname,
        address:req.body.address,
        missingImage:req.body.image,
        description:req.body.description,
        missingstatus:req.body.missingstatus

    }).then(() => {

        res.json({ status: "Missing person reported!"});
    }).catch(next);
});



//delete missing person

router.delete("/deletemissing/:id",(req,res,next)=>{
    console.log(req.params.id);
    Missingperson.findByIdAndDelete(req.params.id)
    .then((Missingperson) => {
        res.json({ status: 'Missing person deleted!', Missingperson: Missingperson })
    }).catch(next);
})


router.get("/getAllmissing",(req, res, next) => {
    console.log("getAllmissing")
    Missingperson.find()
        .then((missingperson) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(missingperson);
        }, (err) => next(err))
        .catch((err) => next(err));
  })

// router.delete('/deletemissing/:id',  (req, res, next) => {
//             res.send("Hello")
//             console.log(req);
//             console.log(req.params.id)

//             // {id : req.params.id}


//         });
// });

module.exports = router;