import React, { useState } from "react";

// function component
// export default () => <span>Auth</span>;

// automatic import
const Auth = () => {
    const [email, setEmail] = useState("");
    const {password, setPassword} = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>   
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange} 
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange} 
                />
                <input type="submit" value="Log In" />
            </form>    
            <div>
                <button>Continue with GitHub</button>
            </div>
        </div>
    );
}

export default Auth;