import React from "react";

const Login = (props) => {
    return (
        <div className="login-container" >
            <p className="welcome-message">Welcome to decentralized voting application</p>
            <button className="login-button" onClick = {props.connectWallet}>Login Metamask</button>
        </div>
    )
}

export default Login;