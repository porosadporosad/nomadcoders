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
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder='Email' required value={email} onChange={onChange} className="authInput"/>
                <input name="password" type="password" placeholder='Password' required value={password} onChange={onChange} className="authInput"/>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} className="authInput authSubmit" />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;