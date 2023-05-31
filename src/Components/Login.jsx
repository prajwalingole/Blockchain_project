import React from "react";

const Login = (props) => {
    return (
        <div className="login" >
            <h2 >Welcome to decentralized voting application</h2>
            <button onClick = {props.connectWallet}>Login Metamask</button>
        </div>
    )
}

export default Login;