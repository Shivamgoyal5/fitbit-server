import React from "react";

const CLIENT_ID = "23QCJS";
const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";  
const FITBIT_AUTH_URL = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800`;

function Login() {
    const handleLogin = () => {
        window.location.href = FITBIT_AUTH_URL;
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login with Fitbit</h1>
            <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Login with Fitbit
            </button>
        </div>
    );
}

export default Login;
