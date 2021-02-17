import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from 'fBase';
import Cweet from "components/Cweet";


const Home = ({ userObj }) => {
    const [cweet, setCweet] = useState("");
    // getting Cweets
    const [cweets, setCweets] = useState([]);
    const [attachment,setAttachment] = useState();
    // 구식 방식
    // const getCweets = async() => {
    //     const dbCweets = await dbService.collection("cweets").get();
    //     dbCweets.forEach((document) => {
    //         const cweetObject = {
    //             ...document.data(),
    //             id: document.id
    //         }
    //         setCweets((prev) => [cweetObject, ...prev]);
    //     });
    // }

    useEffect(() => {
        // readm delete, update 등, 모든 동작시
        // 쿼리가 아닌 snapshot 사용으로 실시간 구현
        dbService.collection("cweets").onSnapshot(snapshot => {
            const cweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            setCweets(cweetArray);
            console.log(cweetArray);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment != "") {
            const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const cweetObj = {
            text: cweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        await dbService.collection("cweets").add(cweetObj);
        setCweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        // 이벤트안의 target안의 벨류
        const {
            target: {value},
        } = event;
        setCweet(value);
    }
    const onFileChange = (event) => {
        const {
            target:{files},
        } = event;
        const theFile = files[0];
        //use fileReader API
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result }, 
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const ClearAttachment = () => setAttachment(null);
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
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Cweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={ClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {cweets.map(cweet => (
                    <Cweet key={cweet.id} cweetObj={cweet} isOwner={cweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );

};
export default Home;