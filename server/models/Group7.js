const mongoose = require("mongoose");

const Group7 = new mongoose.Schema(
    {
        name:{
            type:String,
           
        },
        email: {
            type:String,
           
        },
        admin:{
            type:String,
        },        
    }
);

module.exports = mongoose.model("Group7", Group7);