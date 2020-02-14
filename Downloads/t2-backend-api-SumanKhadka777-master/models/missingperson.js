const mongoose=require('mongoose');
const missingSchema=new mongoose.Schema({

    missingid:{
        type:String,
        require:true,
    },

        fullname:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,

        },
        missingImage:{
            type:String
        },
        description:{
            type:String,
            required:true,
   

        },
        missingstatus:{
            type:Boolean,
            default:true,
        }


})

module.exports=mongoose.model('Missing', missingSchema);