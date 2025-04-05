// const express = require("express");
// const axios = require("axios");
// const session = require("express-session");
// const cors = require("cors");

// const app = express();
// app.use(cors({ origin: "https://fitbit-app-frontend.vercel.app", credentials: true }));
// app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// const CLIENT_ID = "23QCJS";
// const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
// const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";

// // Step 1: Handle Fitbit OAuth Callback
// app.get("/callback", async (req, res) => {
//     const code = req.query.code;
//     console.log("code", code);
//     if (!code) return res.status(400).send("Authorization code not found");

//     try {
//         const tokenResponse = await axios.post("https://api.fitbit.com/oauth2/token",
//             new URLSearchParams({
//                 // client_id: CLIENT_ID,
//                 grant_type: "authorization_code",
//                 redirect_uri: REDIRECT_URI,
//                 code: code
//             }), {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     "Authorization": "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
//                 }
//             });

//         req.session.accessToken = tokenResponse.data.access_token;
//         req.session.userId = tokenResponse.data.user_id;
        
//         res.json({ user_id: tokenResponse.data.user_id });
//     } catch (error) {
//         console.error("Error exchanging code for token:", error.response?.data || error.message);
//         res.status(500).send("Authentication failed");
//     }
// });

// // Step 2: Fetch Fitbit User Profile
// app.get("/profile", async (req, res) => {
//     const accessToken = req.session.accessToken;
//     if (!accessToken) return res.status(401).send("Not authenticated");

//     try {
//         const userProfile = await axios.get("https://api.fitbit.com/1/user/-/profile.json", {
//             headers: { "Authorization": `Bearer ${accessToken}` }
//         });

//         res.json(userProfile.data);
//     } catch (error) {
//         console.error("Error fetching user profile:", error.response?.data || error.message);
//         res.status(500).send("Error fetching user profile");
//     }
// });

// app.listen(process.env.PORT || 5000, () => console.log("Server running on http://localhost:5000"));















const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://fitbit-app-frontend.vercel.app",
    credentials: true,
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

// // Handle preflight requests
// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "https://fitbit-app-frontend.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.sendStatus(200);
// });




app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://fitbit-app-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Configure Sessions
app.use(session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,sameSite:"None" }  // Change to true if using HTTPS
}));

const CLIENT_ID = "23QCJS";
const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";

// Step 1: Handle Fitbit OAuth Callback
app.get("/callback", async (req, res) => {
    const code = req.query.code;
    console.log("code", code);
    if (!code) return res.status(400).send("Authorization code not found");

    try {
        const tokenResponse = await axios.post("https://api.fitbit.com/oauth2/token",
            new URLSearchParams({
                client_id: CLIENT_ID,  // ✅ Fix: Add this
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

            
        const accessToken = req.session.accessToken;
        console.log(req.session.accessToken );
        if (!accessToken) return res.status(401).send("Not authenticated");

            
    } catch (error) {
        console.error("Error exchanging code for token:", error.response?.data || error.message);
        res.status(500).send("Authentication failed");
    }
});

app.get("/", (req, res) => {
    res.send("Backend is running!");
});


// Step 2: Fetch Fitbit User Profile
// Step: Fetch Fitbit Step Data
app.get("/profile", async (req, res) => {
    const accessToken = req.session.accessToken;
    const userId = req.session.userId || "CJJ9T6"; // or use '-' for current user

    if (!accessToken) return res.status(401).send("Not authenticated");

    try {
        const response = await axios.get(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/today.json`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching steps data:", error.response?.data || error.message);
        res.status(500).send("Error fetching steps data");
    }
});

app.listen(process.env.PORT || 5000, () => console.log("Server running on http://localhost:5000")); and it is /callback frontend   import React, { useEffect } from "react";


// const express = require("express");
// const axios = require("axios");
// const session = require("express-session");
// const cors = require("cors");

// const app = express();

// app.use(cors({
//     origin: "https://fitbit-app-frontend.vercel.app",
//     credentials: true,
//     methods: "GET,POST,OPTIONS",
//     allowedHeaders: "Content-Type,Authorization"
// }));

// // Handle preflight requests
// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "https://fitbit-app-frontend.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.sendStatus(200);
// });

// // Configure Sessions
// app.use(session({
//     secret: "supersecretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }  // Change to true if using HTTPS
// }));

// const CLIENT_ID = "23QCJS";
// const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
// const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";

// // Step 1: Handle Fitbit OAuth Callback
// app.get("/callback", async (req, res) => {
//     const code = req.query.code;
//     console.log("Authorization code:", code);
//     if (!code) return res.status(400).send("Authorization code not found");

//     try {
//         const tokenResponse = await axios.post("https://api.fitbit.com/oauth2/token",
//             new URLSearchParams({
//                 client_id: CLIENT_ID,
//                 grant_type: "authorization_code",
//                 redirect_uri: REDIRECT_URI,
//                 code: code
//             }), {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     "Authorization": "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
//                 }
//             });

//         req.session.accessToken = tokenResponse.data.access_token;
//         req.session.userId = tokenResponse.data.user_id;
        
//         // Print the access token to console
//         console.log("Access Token:", req.session.accessToken);
//         console.log("Full token response:", tokenResponse.data);
        
//         res.json({ 
//             user_id: tokenResponse.data.user_id,
//             access_token: tokenResponse.data.access_token // Optional: send token to client if needed
//         });

//     } catch (error) {
//         console.error("Error exchanging code for token:", error.response?.data || error.message);
//         res.status(500).send("Authentication failed");
//     }
// });

// app.get("/", (req, res) => {
//     res.send("Backend is running!");
// });

// // Step 2: Fetch Fitbit User Profile and Step Data
// app.get("/profile", async (req, res) => {
//     const accessToken = req.session.accessToken;
//     const userId = req.session.userId || "CJJ9T6"; // or use '-' for current user

//     if (!accessToken) return res.status(401).send("Not authenticated");

//     try {
//         const response = await axios.get(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/today.json`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching steps data:", error.response?.data || error.message);
//         res.status(500).send("Error fetching steps data");
//     }
// });

// app.listen(process.env.PORT || 5000, () => console.log("Server running on http://localhost:5000"));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

















// const express = require("express");
// const axios = require("axios");
// const session = require("express-session");
// const cors = require("cors");
// const { Buffer } = require("buffer");

// const app = express();

// // Constants (You should use dotenv in real deployment)
// const CLIENT_ID = "23QCJS";
// const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
// const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";
// const FRONTEND_ORIGIN = "https://fitbit-app-frontend.vercel.app";

// // Middleware setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS setup
// app.use(cors({
//     origin: FRONTEND_ORIGIN,
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//     allowedHeaders: "Content-Type,Authorization,X-Requested-With"
// }));

// app.options("*", cors({
//     origin: FRONTEND_ORIGIN,
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//     allowedHeaders: "Content-Type,Authorization,X-Requested-With"
// }));

// // Session setup
// app.use(session({
//     name: "fitbit.sid",
//     secret: "supersecretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: true, // works with HTTPS
//         httpOnly: true,
//         sameSite: "none", // allow cross-site cookies (important for Vercel)
//         maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

// // Test route
// app.get("/", (req, res) => {
//     res.send("Fitbit OAuth Server is running!");
// });

// // Callback route
// app.get("/callback", async (req, res) => {
//     try {
//         const { code, error } = req.query;

//         if (error) {
//             console.error("OAuth error:", error);
//             return res.redirect(`${FRONTEND_ORIGIN}/error?message=${encodeURIComponent(error)}`);
//         }

//         if (!code) {
//             return res.status(400).json({ error: "Authorization code missing" });
//         }

//         console.log("Received authorization code:", code);

//         // Exchange code for access token
//         const tokenResponse = await axios.post(
//             "https://api.fitbit.com/oauth2/token",
//             new URLSearchParams({
//                 grant_type: "authorization_code",
//                 redirect_uri: REDIRECT_URI,
//                 code: code
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     "Authorization": "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
//                 }
//             }
//         );

//         const data = tokenResponse.data;

//         // Save tokens to session
//         req.session.accessToken = data.access_token;
//         req.session.refreshToken = data.refresh_token;
//         req.session.userId = data.user_id;
//         req.session.tokenExpires = Date.now() + (data.expires_in * 1000);

//         console.log("Successfully obtained tokens for user:", data.user_id);

//         req.session.save(err => {
//             if (err) {
//                 console.error("Failed to save session:", err);
//                 return res.status(500).json({ error: "Session save error" });
//             }

//             // Redirect or respond
//             res.redirect(`${FRONTEND_ORIGIN}/profile`);
//         });

//     } catch (err) {
//         console.error("Token exchange failed:", err.response?.data || err.message);
//         res.status(500).json({ 
//             error: "Failed to obtain access token",
//             details: err.response?.data || null
//         });
//     }
// });

// // Profile route
// app.get("/profile", async (req, res) => {
//     try {
//         const { accessToken, userId } = req.session;

//         if (!accessToken || !userId) {
//             return res.status(401).json({ error: "Not authenticated" });
//         }

//         console.log("Fetching profile data for user:", userId);

//         const profileResponse = await axios.get(
//             `https://api.fitbit.com/1/user/${userId}/profile.json`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             }
//         );

//         res.json(profileResponse.data);

//     } catch (err) {
//         console.error("Failed to fetch profile:", err.response?.data || err.message);
//         res.status(500).json({
//             error: "Failed to fetch profile",
//             details: err.response?.data || null
//         });
//     }
// });
