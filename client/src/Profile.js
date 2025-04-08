import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [stepsData, setStepsData] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem("access_token"); // or the key you're using
    if (!token) return console.error("Access token not found in localStorage");

    axios.get("https://fitbit-app-backend.vercel.app/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
    .then(response => setStepsData(response.data))
    .catch(error => console.error("Error fetching profile:", error));
}, []);


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Step Count</h1>
            {stepsData ? (
                <div>
                    <h2>Steps Today: {stepsData["activities-steps"]?.[0]?.value || "N/A"}</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


export default Profile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Profile() {
//     const [stepsData, setStepsData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get("https://fitbit-app-backend.vercel.app/profile", {
//             withCredentials: true
//         })
//         .then(response => {
//             setStepsData(response.data);
//             setLoading(false);
//         })
//         .catch(err => {
//             console.error("Error fetching profile:", err);
//             setError("Failed to load step data.");
//             setLoading(false);
//         });
//     }, []);

//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>Step Count</h1>

//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//             ) : stepsData ? (
//                 <div>
//                     <h2>
//                         Steps Today: {stepsData["activities-steps"]?.[0]?.value || "N/A"}
//                     </h2>
//                 </div>
//             ) : (
//                 <p>No step data available.</p>
//             )}
//         </div>
//     );
// }

// export default Profile;
