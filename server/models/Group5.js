// const mongoose = require("mongoose");

// const Group5 = new mongoose.Schema(
//     {
//          name: [{
//             type: String,
//             maxLength: 50,
//         }],
//         email: {
//             type:String,
//             maxLength:50,
//         },
//         admin:{
//             type:String,
//         },   
//         Challenge:{
//             type:String,
//         } ,  
//         Quote:{
//             type:String,
//         }, 
//         Tips:{
//             type:String,
//         },  
//     }
// );

// module.exports = mongoose.model("Group5", Group5);









const mongoose = require("mongoose");

const Group5Schema = new mongoose.Schema({
  
  name: [{
    type: String,
    maxLength: 50,
  }],
  email: {
    type: String,
    maxLength: 50,
  },
  admin: {
    type: String,
  },

  Challenge: {
    steps: [String], // Array of step descriptions
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    caloriesRunning: {
      type: Number,
      default: 0,
    },
    caloriesCycling: {
      type: Number,
      default: 0,
    },
  },

  Quote: {
    type: String,
  },

  Tips: {
    waterIntake: {
      type: Number, // in liters
    },
    calorieIntake: {
      type: Number,
    },
    sleepHours: {
      type: Number,
    },
    foodRecommendation: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Group5", Group5Schema);

