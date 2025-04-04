import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [stepsData, setStepsData] = useState(null);

    useEffect(() => {
        axios.get("https://fitbit-app-backend.vercel.app/profile", {
            withCredentiala: true })
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
