const mongoose = require("mongoose");

const Group3 = new mongoose.Schema(
    {
        name:{
            type:String,
            maxLength:50,
        },
        email: {
            type:String,
            maxLength:50,
        },
        admin:{
            type:String,
        },        
    }
);

module.exports = mongoose.model("Group3", Group3);