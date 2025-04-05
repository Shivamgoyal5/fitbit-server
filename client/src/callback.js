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

// // CallbackPage.jsx


import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Processing Fitbit login...");

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      axios
        .get(`https://fitbit-app-backend.vercel.app/callback?code=${code}`, {
          withCredentials: true, // ✅ Required to include session cookie
        })
        .then((response) => {
          localStorage.setItem("user_id", response.data.user_id);
          setStatus("Login successful! Redirecting to profile...");
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error.response?.data || error.message);
          setStatus("Failed to log in with Fitbit.");
        });
    } else {
      setStatus("No authorization code found in URL.");
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>{status}</h2>
    </div>
  );
}

export default Callback;

