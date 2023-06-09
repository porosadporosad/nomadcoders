import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';
import {addDoc,collection, onSnapshot, orderBy, query} from "firebase/firestore";
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const q = query(collection(dbService,"nweets"),orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const nweetArr = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
        
    },[]);
    const onSubmit = async(event) => {
        event.preventDefault();
        const docRef = await addDoc(collection(dbService,"nweets"),{
            text:nweet,
            createdAt:Date.now(),
            creatorId: userObj.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setNweet("");
    }
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const{
            target:{files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            
        }
        reader.readAsDataURL(theFile);
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" />
                <input type="submit" value="Nweer" />
            </form>
            <div>
                {nweets.map((nweet) => (
                   <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;