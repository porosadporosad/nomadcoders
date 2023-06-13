import React, { useState } from 'react';
import {authService} from "fbase";
import { updateProfile } from "@firebase/auth";
import {useHistory} from 'react-router-dom';

export default ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
    };
   
    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
}