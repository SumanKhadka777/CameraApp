const mongoose=require('mongoose');
const reportSchema=new mongoose.Schema({
    reportid:{
        type:String,
        // require:true,
        
    },
    phonenumber:{
            type:String,
            // require:true,
    },
    crimedetails:{
        type:String,
            // require:true,


    },
    location:{
        type:String,
            // require:true,


    },
    areapincode:{
        type:String,
        // require:true,



    }

});
module.exports = mongoose.model('Reportcrime',reportSchema );