const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
// const User = require("/models/User");

// const Group1 = require("/models/Group1");
// const Group2 = require("/models/Group2");
// const  Group3= require("/models/Group3");
// const Group4 = require("/models/Group4");
// const Group5 = require("/models/Group5");
// const Group6 = require("/models/Group6");
// const Group7 = require("/models/Group7");


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

        // const name = profileRes.data.user.fullName;
        // const age = profileRes.data.user.age;
        // const height = profileRes.data.user.height;
        // const weight = profileRes.data.user.weight;
        // const gender = profileRes.data.user.gender;
        // const steps = stepsRes.data["activities-steps"][0].value;
        // const calories = caloriesRes.data.summary.caloriesOut;

        // const walking = caloriesRes.data.summary.distances.find(
        //    d => d.activity === "total"
        // );
        // const totalDistance = totalDistanceObj ? totalDistanceObj.distance : 0;


 // const user = await User.create({
 //      name,
 //      // age,
 //      // height,
 //      // weight,
 //      // gender,
 //      // steps,
 //      // calories,
 //      // walking,
 //    });
        


        res.json({
            profile: profileRes.data,
            steps: stepsRes.data,
            calories: caloriesRes.data.summary            
        });
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        res.status(500).send("Error fetching user profile");
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));



































