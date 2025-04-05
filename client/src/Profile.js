// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Profile() {
//     const [stepsData, setStepsData] = useState(null);

//     useEffect(() => {
//         axios.get("https://fitbit-app-backend.vercel.app/profile", {
//             withCredentiala: true })
//             .then(response => setStepsData(response.data))
//             .catch(error => console.error("Error fetching profile:", error));
//     }, []);

//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>Step Count</h1>
//             {stepsData ? (
//                 <div>
//                     <h2>Steps Today: {stepsData["activities-steps"]?.[0]?.value || "N/A"}</h2>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }


// export default Profile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [stepsData, setStepsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fitbit-app-backend.vercel.app/profile", {
                    withCredentials: true
                });
                setStepsData(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to load data. Please try again.");
                // If unauthorized, redirect to home
                if (error.response?.status === 401) {
                    navigate("/");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Loading your step data...</h1>
                <p>Please wait while we retrieve your information.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Step Count</h1>
            {stepsData ? (
                <div>
                    <h2>Steps Today: {stepsData["activities-steps"]?.[0]?.value || "N/A"}</h2>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default Profile;
