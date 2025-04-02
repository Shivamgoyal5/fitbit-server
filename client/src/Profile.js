import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/profile")
            .then(response => setUserProfile(response.data))
            .catch(error => console.error("Error fetching profile:", error));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>User Profile</h1>
            {userProfile ? (
                <div>
                    <h2>{userProfile.user.fullName}</h2>
                    <img src={userProfile.user.avatar} alt="Avatar" />
                    <p>Age: {userProfile.user.age}</p>
                    <p>Gender: {userProfile.user.gender}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;