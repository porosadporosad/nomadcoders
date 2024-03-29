import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Raect, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            const auth = getAuth();
            if(newAccount){
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else{
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch(error){
            setError(error.message);
        }
    };
    const onChange = (event) => {
        const {target : {name, value} } = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    };
    return(
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder='Email' required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder='Password' required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;