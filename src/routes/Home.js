import React, { useState } from "react";
import { dbService } from 'fBase';


const Home = () => {
    const [cweet, setCweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("cweets").add({
            cweet,
            createdAt: Date.now()
        });
        setCweet('');
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