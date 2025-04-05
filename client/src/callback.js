// import React, { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// function Callback() {
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
    
//     useEffect(() => {
//         const code = searchParams.get("code");

//         if (code) {
//             axios.get(`https://fitbit-app-backend.vercel.app/callback?code=${code}` , {
//                 withCredentials: true
//             })
//             .then(response => {
//                 localStorage.setItem("user_id", response.data.user_id);
//                 navigate("/profile");
//             })
//             .catch(error => {
//                 console.error("Error exchanging code for token", error);
//             });
//         }
//     }, [searchParams, navigate]);

//     return <h2>Processing Fitbit login...</h2>;
// }

// export default Callback;

// CallbackPage.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      // Send code to backend to exchange for token
      fetch("https://your-api.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("access_token", data.access_token);
          navigate("/profile"); // Go to the next page
        })
        .catch(err => {
          console.error("Error exchanging token:", err);
        });
    } else {
      console.error("Authorization code not found in URL");
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
}

export default Callback;
