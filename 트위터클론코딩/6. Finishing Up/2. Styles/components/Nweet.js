import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";



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
        <div className="nweet">
            {
                editing ? 
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input value={newNweet} autoFocus type="text" placeholder="Edit your nweet" required onChange={onChange} className="formInput" />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </>:
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner &&(
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            }
        </div>
    );
}

export default Nweet;