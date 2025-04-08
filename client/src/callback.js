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
            localStorage.setItem("access_token", response.data.access_token);
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


// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// // Configure axios globally
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://fitbit-app-backend.vercel.app";

// function Callback() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [status, setStatus] = useState("Processing Fitbit login...");

//   useEffect(() => {
//     const code = searchParams.get("code");

//     if (!code) {
//       setStatus("No authorization code found in URL.");
//       return;
//     }

//     const exchangeCode = async () => {
//       try {
//         // First exchange code for token
//         const authResponse = await axios.get(`/callback?code=${code}`);
        
//         // Then immediately test the profile endpoint
//         const profileResponse = await axios.get('/profile');
        
//         localStorage.setItem("user_id", authResponse.data.user_id);
//         setStatus("Login successful! Redirecting to profile...");
//         navigate("/profile");
//       } catch (error) {
//         console.error("Authentication error:", {
//           response: error.response?.data,
//           message: error.message
//         });
        
//         setStatus(`Failed: ${error.response?.data?.error || error.message}`);
//       }
//     };

//     exchangeCode();
//   }, [searchParams, navigate]);

//   return (
//     <div>
//       <h2>{status}</h2>
//       {status.includes("Failed") && (
//         <button onClick={() => window.location.reload()}>Try Again</button>
//       )}
//     </div>
//   );
// }

// export default Callback;
