import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { ThemeContext } from "./context"

// import { 
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,  
//     onAuthStateChanged,  
//     signOut,
//     GoogleAuthProvider,
//     signInAnonymously
//    } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

// import { useCollectionData } from 'react-firebase-hooks/firestore';

// Your web app's Firebase configuration
firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "disney-plus-clone-9c8f4.firebaseapp.com",
    projectId: "disney-plus-clone-9c8f4",
    storageBucket: "disney-plus-clone-9c8f4.appspot.com",
    messagingSenderId: "45125402695",
    appId: "1:45125402695:web:2d9fadcd3cfbad454ab162"
})

// Initialize Firebase
const auth = firebase.auth()                                     // initialize firebase authentication
const firestore = firebase.firestore()                           // initialize cloud database "firestore"


function SignIn({location})  {    // SIGN IN  COMPONENT (SIGN IN BUTTON(S))
    const [user] = useAuthState(auth)   // useAuthState USER HOOK => user signed in? => object with user info => not signed in? => null
    const context = React.useContext(ThemeContext)
    user ? context.setUser(true) : context.setUser(false)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()    //determine provider (Google) 
        auth.signInWithPopup(provider)                             //sign in with popup => auth.signInWithPopup(provider)  
    }
    const signInAnonymous = () => {
      auth.signInAnonymously().catch(alert);
    }

    return (
        !user ? 
        // <button onClick={() => context.setUser(false)} className="menuItemTxt login"> <i class="fa-solid fa-user"></i> SIGN-IN </button> : 
            location === "header" ? <button className="login header" onClick={()=> context.setUser(true)}> SIGN-IN </button> :
        <div>
            <button onClick={signInWithGoogle} className="loginPopup"><i className="menuIcon fa-brands fa-google"></i> GOOGLE </button>
            <button onClick={signInAnonymous} className="loginPopup"><i className="menuIcon fa-solid fa-user-secret"></i> ANONYMOUS</button>
        </div> : 
        user.isAnonymous ? <button onClick={() => auth.signOut()} className="login"> <i className="menuIcon fa-solid fa-user-secret"></i> SIGN-OUT </button> :
        <button onClick={() => auth.signOut()} className="login"> <i className="menuIcon fa-brands fa-google"></i> SIGN-OUT </button>
        
    )
} 

// function SignInPopup()  {    // SIGN IN  COMPONENT (SIGN IN BUTTON(S))
//     const [user] = useAuthState(auth)   // useAuthState USER HOOK => user signed in? => object with user info => not signed in? => null

//     const signInWithGoogle = () => {
//         const provider = new firebase.auth.GoogleAuthProvider()    //determine provider (Google) 
//         auth.signInWithPopup(provider)                             //sign in with popup => auth.signInWithPopup(provider)  
//     }
//     const signInAnonymous = () => {
//       auth.signInAnonymously().catch(alert);
//     }
//     user && console.log(user.isAnonymous)
//     return (
//         !user ? 
//         <div>
//             <button onClick={signInWithGoogle} className="login">With Google</button>
//             <button onClick={signInAnonymous} className="login">Anonymously</button>
//         </div> : 
//         user.isAnonymous ? <button onClick={() => auth.signOut()} className="login"> <i class="menuIcon fa-solid fa-user-secret"></i> SIGN-OUT </button> :
//         <button onClick={() => auth.signOut()} className="menuItemTxt login"> <i class="menuIcon fa-brands fa-google"></i> SIGN-OUT </button>
        
//     )
// } 

export { SignIn, auth } //, SignInPopup
  