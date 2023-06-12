import React, { useEffect } from 'react';
import {authService, dbService} from "fbase";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";
import {useHistory} from 'react-router-dom';

export default ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const getMyNweets = async() => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt")

        );
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
    }
    useEffect(() => {
        getMyNweets();
    },[])
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
}