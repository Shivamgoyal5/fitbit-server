const mongoose = require("mongoose");

const Group4_chall = new mongoose.Schema(
    {
        Challenge:{
            type:String,
        } ,  
        Quote:{
            type:String,
        }, 
        Tips:{
            type:String,
        },       
    }
);

module.exports = mongoose.model("Group4_chall", Group4_chall);