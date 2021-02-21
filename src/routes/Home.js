import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";
import Cweet from "components/Cweet";

const Home = ({ userObj }) => {
  const [cweet, setCweet] = useState("");
  const [cweets, setCweets] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCweets(nweetArray);
    });
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
        const {
          target: { value },
        } = event;
        setCweet(value);
      };
      const onFileChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          const {
            currentTarget: { result },
          } = finishedEvent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };
      const onClearAttachment = () => setAttachment(null);
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
                <button onClick={onClearAttachment}>Clear</button>
              </div>
            )}
          </form>
          <div>
            {cweets.map((cweet) => (
              <Cweet
                key={cweet.id}
                cweetObj={cweet}
                isOwner={cweet.creatorId === userObj.uid}
              />
            ))}
          </div>
        </div>
      );
    };
    export default Home;