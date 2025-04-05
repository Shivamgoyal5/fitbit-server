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

import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Callback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const code = searchParams.get("code");

        if (code) {
            axios.get(`https://fitbit-app-backend.vercel.app/callback?code=${code}`, {
                withCredentials: true
            })
            .then(response => {
                // Store user ID in localStorage
                localStorage.setItem("user_id", response.data.user_id);
                
                // Add a small delay to ensure session is fully established
                setTimeout(() => {
                    navigate("/profile");
                }, 500);
            })
            .catch(error => {
                console.error("Error exchanging code for token", error);
                navigate("/"); // Redirect to home if error occurs
            });
        } else {
            navigate("/"); // Redirect to home if no code
        }
    }, [searchParams, navigate]);

    return <h2>Processing Fitbit login...</h2>;
}

export default Callback;
