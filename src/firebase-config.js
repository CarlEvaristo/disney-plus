import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { ThemeContext } from "./context"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"   // to get firestore db
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,  
    onAuthStateChanged,  
    signOut,
    GoogleAuthProvider,
    signInAnonymously
   } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

// import { useCollectionData } from 'react-firebase-hooks/firestore';

// Your web app's Firebase configuration
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "disney-plus-clone-9c8f4.firebaseapp.com",
    projectId: "disney-plus-clone-9c8f4",
    storageBucket: "disney-plus-clone-9c8f4.appspot.com",
    messagingSenderId: "45125402695",
    appId: "1:45125402695:web:2d9fadcd3cfbad454ab162"
})

// Initialize Firebase
const auth = firebase.auth()                                        // initialize firebase authentication
// const firestore = firebase.firestore()                           // initialize cloud database "firestore"
const db = getFirestore(app)                                        // getFirestore method: connect db to app
const storage = getStorage(app);


function SignIn({location})  {    // SIGN IN  COMPONENT (SIGN IN BUTTON(S))
    const [registerEmail, setRegisterEmail] = React.useState("")
    const [registerPassword, setRegisterPassword] = React.useState("")
    const [loginEmail, setLoginEmail] = React.useState("")
    const [loginPassword, setLoginPassword] = React.useState("")
    const [showRegister, setShowRegister] = React.useState(false)
    const context = React.useContext(ThemeContext)
    const [user] = useAuthState(auth)   // useAuthState USER HOOK => user signed in? => object with user info => not signed in? => null
    const [newRegister, setNewRegister] = React.useState(false)

    // ref to save user to db:
    const usersCollectionRef  = collection(db, "users")   
   
    React.useEffect(()=>{
        auth.onAuthStateChanged((currentUser)=>{       // takes auth as argument and currentuser as argument of callback
            context.userSetter(currentUser)    //=> if you close browser firebase remembers you didnt logged out with onAuthStateChanged
        })
    })    //=> this run continuously to check if the auth user state (login/logout) changes


    function register() {
        auth.createUserWithEmailAndPassword(registerEmail, registerPassword)
            .then(res=> addDoc(usersCollectionRef, {
                    uid:res.user.uid,
                    email:registerEmail,
                    admin: false,
                    favo: []
                }))
            .catch(err1 => console.log("error", err1))
    }
      
    function login() {
        auth.signInWithEmailAndPassword(loginEmail, loginPassword)
            .then()
            .catch(err2 => console.log("error", err2))
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()    //determine provider (Google) 
        auth.signInWithPopup(provider)                             //sign in with popup => auth.signInWithPopup(provider)  
            .then(res=> console.log("GOOGLE LOGIN: ", res))
    }
    const signInAnonymous = () => {
      auth.signInAnonymously().catch(alert);
    }

    // const SignOutCustom = () => {
    //     auth.signOut()

    //             const navigate = useNavigate();
    //     navigate("/");
    // }

    return (
        !user ? (location === "popup" &&
        <>
            {/* {!showRegister && <>
            <h3>Login with Google</h3>
            <div className="flexWrapper">
                <button onClick={signInWithGoogle} className="loginPopup"><i className="menuIcon fa-brands fa-google"></i> GOOGLE </button>
                <button onClick={signInAnonymous} className="loginPopup"><i className="menuIcon fa-solid fa-user-secret"></i> ANONYMOUS</button>
            </div>
            </>} */}

            {showRegister && <>
            <h3>Register New User</h3>
            <div className="flexWrapper">
                <input className="popupInput" type="email" placeholder="Your email..." onChange={(event)=>setRegisterEmail(event.target.value)} value={registerEmail} required />
                <input className="popupInput" type="password" placeholder="Your password..."  onChange={(event)=>setRegisterPassword(event.target.value)} value={registerPassword} required />
                <button onClick={register} className="loginPopup">SIGN UP</button>
            </div>
            </>} 
            
            {!showRegister && <>
            <h3>Login with email</h3>
            <div className="flexWrapper">
                <input className="popupInput" type="email" placeholder="Your email..." onChange={(event)=>setLoginEmail(event.target.value)} value={loginEmail} required />
                <input className="popupInput" type="password" placeholder="Your password..." onChange={(event)=>setLoginPassword(event.target.value)} value={loginPassword} required />
                <button onClick={login} className="loginPopup">LOGIN</button>
            </div>
            <p>No account? <a href="#" onClick={()=>setShowRegister(true)}>Create one!</a></p>
            </>}
        </> ) : 
        (location === "header" &&
            <button onClick={() => auth.signOut()} className="login">SIGN-OUT:  {user.email ? (user.email).split('@')[0]: "anonymous"}</button>
            )  
    
    )
} 

export { app, db, storage, SignIn, auth, useAuthState } 


