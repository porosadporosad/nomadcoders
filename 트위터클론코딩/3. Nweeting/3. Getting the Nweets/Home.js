import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';
import {addDoc,collection, getDocs} from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService,"nweets"));
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id:document.id,
            }
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    },[]);
    const onSubmit = async(event) => {
        event.preventDefault();
        const docRef = await addDoc(collection(dbService,"nweets"),{
            nweet,
            createdAt:Date.now(),
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
                        <h4>{nweet.nweet}</h4>
                    </div>)
                )}
            </div>
        </div>
    )
}

export default Home;