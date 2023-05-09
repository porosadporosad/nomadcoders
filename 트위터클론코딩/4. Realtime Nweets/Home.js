import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';
import {addDoc,collection, onSnapshot, orderBy, query} from "firebase/firestore";

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
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweer" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>)
                )}
            </div>
        </div>
    )
}

export default Home;