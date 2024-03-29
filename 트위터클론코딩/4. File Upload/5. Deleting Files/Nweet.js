import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
        const urlRef = ref(storageService, nweetObj.attachmentUrl);
        if(ok) {
            await deleteDoc(NweetTextRef);
            await deleteObject(urlRef)
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
        await updateDoc(NweetTextRef, {
            text: newNweet,});
            setEditing(false);
    }
    const onChange = (e) => {
        const{
            target:{value},
        } = e;
        setNewNweet(value);
    }
    return (
        <div>
            {
                editing ? 
                    <>
                        <form onSubmit={onSubmit}><input value={newNweet} type="text" placeholder="Edit your nweet" required onChange={onChange} />
                        <input type="submit" value="Update Nweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>:
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && < img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
                    {isOwner &&(
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            }
        </div>
    );
}

export default Nweet;