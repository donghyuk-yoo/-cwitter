import React, { useState } from "react";


const Home = () => {
    const [cweet, setCweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        // 이벤트안의 target안의 벨류
        const {
            target: {value},
        } = event;
        setCweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={cweet} 
                    onChange={onChange}
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type="submit" value="Cweet" />
            </form>
        </div>
    );

};
export default Home;