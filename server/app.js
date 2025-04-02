const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "https://fitbit-app-f95o.vercel.app", credentials: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

const CLIENT_ID = "23QCJS";
const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
const REDIRECT_URI = "https://localhost:3000/callback";

// Step 1: Handle Fitbit OAuth Callback
app.get("/callback", async (req, res) => {
    const code = req.query.code;
    console.log("code", code);
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
        
        res.json({ user_id: tokenResponse.data.user_id });
    } catch (error) {
        console.error("Error exchanging code for token:", error.response?.data || error.message);
        res.status(500).send("Authentication failed");
    }
});

// Step 2: Fetch Fitbit User Profile
app.get("/profile", async (req, res) => {
    const accessToken = req.session.accessToken;
    if (!accessToken) return res.status(401).send("Not authenticated");

    try {
        const userProfile = await axios.get("https://api.fitbit.com/1/user/-/profile.json", {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        res.json(userProfile.data);
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        res.status(500).send("Error fetching user profile");
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
