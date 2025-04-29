const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
const User = require("./models/User");

const Group1 = require("./models/Group1");
const Group2 = require("./models/Group2");
const  Group3= require("./models/Group3");
const Group4 = require("./models/Group4");
const Group5 = require("./models/Group5");
const Group6 = require("./models/Group6");
const Group7 = require("./models/Group7");
const Group1_chall = require("./models/Group1_chall");
const Group2_chall = require("./models/Group2_chall");
const  Group3_chall= require("./models/Group3_chall");
const Group4_chall = require("./models/Group4_chall");
const Group5_chall = require("./models/Group5_chall");
const Group6_chall = require("./models/Group6_chall");
const Group7_chall = require("./models/Group7_chall");


const dbConnect = require("./config/database");
dbConnect();

const app = express();
app.use(cors({ origin: ["*"], credentials: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

const CLIENT_ID = "23QCJS";
const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";


let a ;

// Step 1: Handle Fitbit OAuth Callback
app.get("/callback", async (req, res) => {
    const code = req.query.code;
    console.log("code", code);
    console.log("req.query", REDIRECT_URI);
    if (!code) return res.status(400).send("Authorization code not found");

    try {
        const tokenResponse = await axios.post("https://api.fitbit.com/oauth2/token",
            new URLSearchParams({
                // client_id: CLIENT_ID,
                grant_type: "authorization_code",
                redirect_uri: REDIRECT_URI,
                code: code
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
                }
            });

        req.session.accessToken = tokenResponse.data.access_token;
        req.session.userId = tokenResponse.data.user_id;
        a = tokenResponse.data.user_id;
        
        res.json({ user_id: tokenResponse.data.user_id, access_token: tokenResponse.data.access_token });
    } catch (error) {
        console.log(error)
        console.error("Error exchanging code for token:", error.response?.data || error.message);
        res.status(500).send("Authentication failed");
    }
});

app.get("/", async (req, res) => {
    res.send("backend is running");
});


// Step 2: Fetch Fitbit User Profile
app.get("/profile", async (req, res) => {
    // Look for token in Authorization header
    const authHeader = req.headers.authorization;
    
    const userId = a;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Not authenticated");
    }

    const accessToken = authHeader.split(" ")[1]; // Get token from "Bearer <token>"

    try {
        const headers = {
            "Authorization": `Bearer ${accessToken}`
        };

        const today = new Date().toISOString().split("T")[0];

        // Make parallel requests for profile and steps
        const [profileRes , stepsRes, caloriesRes] = await Promise.all([
            axios.get(`https://api.fitbit.com/1/user/${userId}/profile.json`, { headers }),
            axios.get(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/today.json`, { headers }),
            axios.get(`https://api.fitbit.com/1/user/${userId}/activities/date/${today}.json`, { headers })
        ]);
        console.log(profileRes.data);
        const name=profileRes.data.user.fullName;
//        const walkingObj = caloriesRes.data.summary.distances?.find(d => d.activity === "total");
// const walking = walkingObj ? walkingObj.distance : 0;

      const distances = caloriesRes.data.summary.distances || [];
        const walkingObj = distances.find(d => d.activity === "total");
        const runningObj = distances.find(d => d.activity === "veryActive");
        const cyclingObj = distances.find(d => d.activity === "moderatelyActive");

        const walking = walkingObj ? walkingObj.distance : 0;
        const running = runningObj ? runningObj.distance : 0;
        const cycling = cyclingObj ? cyclingObj.distance : 0;
        const age = profileRes.data.user.age;
        // const email = profileRes.data.user.email;
        const height = profileRes.data.user.height;
        const weight = profileRes.data.user.weight;
        const gender = profileRes.data.user.gender;
        const steps = stepsRes.data["activities-steps"][0].value||0;
        const calories = caloriesRes.data.summary.caloriesOut;

       const BMI=(weight)/((height/100)**2);

    let group;

if (gender === 'MALE') {
  if (age <= 50) {
    if (BMI < 18.5) {
      group = 'd';
    } else if (BMI >= 18.5 && BMI <= 24.9) {
      group = 'g';
    } else {
      group = 'e';
    }
  } else {
    group = 'f';
  }
} else {
  if (age <= 50) {
    if (BMI < 18.5) {
      group = 'a';
    } else if (BMI >= 18.5 && BMI <= 24.9) {
      group = 'g';
    } else {
      group = 'b';
    }
  } else {
    group = 'c';
  }
}

if (group === 'a') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group1 = await Group1.findOne();

    if (!group1) {
        // If no Group1 document exists, create a new one
        group1 = new Group1({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group1.name.push(name);
    }

    await group1.save();
}

        
        if (group === 'b') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group2 = await Group2.findOne();

    if (!group2) {
        // If no Group1 document exists, create a new one
        group2 = new Group2({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group2.name.push(name);
    }

    await group2.save();
}
        if (group === 'c') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group1 = await Group3.findOne();

    if (!group3) {
        // If no Group1 document exists, create a new one
        group3 = new Group3({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group3.name.push(name);
    }

    await group3.save();
}
        if (group === 'd') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group4 = await Group4.findOne();

    if (!group4) {
        // If no Group1 document exists, create a new one
        group4 = new Group4({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group4.name.push(name);
    }

    await group4.save();
}
        if (group === 'e') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group5 = await Group5.findOne();

    if (!group5) {
        // If no Group1 document exists, create a new one
        group5 = new Group5({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group5.name.push(name);
    }

    await group5.save();
}
        if (group === 'f') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group6 = await Group6.findOne();

    if (!group6) {
        // If no Group1 document exists, create a new one
        group6 = new Group6({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group6.name.push(name);
    }

    await group6.save();
}
        if (group === 'g') {
    // Find the existing Group1 document or create one if it doesn't exist
    let group7 = await Group7.findOne();

    if (!group7) {
        // If no Group1 document exists, create a new one
        group7 = new Group7({
            name: [name], // Initialize with the first name
               // Set admin if needed
        });
    } else {
        // If Group1 document exists, push the new name into the array
        group7.name.push(name);
    }

    await group7.save();
}

let groupModel;
switch (group) {
  case 'a': groupModel = Group1_chall; break;
  case 'b': groupModel = Group2_chall; break;
  case 'c': groupModel = Group3_chall; break;
  case 'd': groupModel = Group4_chall; break;
  case 'e': groupModel = Group5_chall; break;
  case 'f': groupModel = Group6_chall; break;
  case 'g': groupModel = Group7_chall; break;
  default: groupModel = null;
}

let groupData = {};
if (groupModel) {
    const doc = await groupModel.findOne();
    if (doc) {
        groupData = {
            challenge: doc.Challenge || {},
            quote: doc.Quote || "",
            tips: doc.Tips || {}
        };
    }
}



        



 const user = await User.create({
      name,
     // email,
      age,
      height,
      weight,
      gender,
        steps,
      calories,
      walking,
     running,
     cycling,
     group,
    });
        


        res.json({
            profile: profileRes.data,
            steps: stepsRes.data,
            calories: caloriesRes.data.summary,
            groupInfo: groupData,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        res.status(500).send("Error fetching user profile");
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));



































