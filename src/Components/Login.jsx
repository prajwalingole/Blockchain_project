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
// https://rpc.sepolia.org/92744da330d848cd9bcd74a3796d6a04
// 0x315b14d1e5dc80F0b3630699c280824224aE3ac