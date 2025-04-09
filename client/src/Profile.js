import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [data, setData] = useState(null);

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
            <h1>Fitbit Profile</h1>
            {data ? (
                <div>
                    <h2>👤 Name: {data.profile.fullName}</h2>
                    <p>🎂 Age: {data.profile.age}</p>
                    <p>📏 Height: {data.profile.height} cm</p>
                    <p>⚖️ Weight: {data.profile.weight} kg</p>
                    <p>🚻 Gender: {data.profile.gender}</p>
                    <h2>🚶 Steps Today: {data.steps?.[0]?.value || "N/A"}</h2>
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
