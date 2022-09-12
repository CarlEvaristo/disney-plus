import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Films from "./pages/Films"
import Detail from "./pages/Detail"
import Login from "./pages/Login"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"
import Header from "./components/Header"
import Brand from "./pages/Brand"
import { ThemeContext } from "./context"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

//firebase hooks
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"

// firebase initialization:
firebase.initializeApp({
  //your config
})
const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const context = React.useContext(ThemeContext)
  const backGround = context.channel !== null ? `${context.channel}Bg` : "background" 

  return (
    <div className={backGround}>   
      <Header/>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/brand/:brand" element={ <Brand /> } />
        <Route exact path="/films" element={ <Films /> } />
        <Route path="/films/:id" element={ <Detail /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </div>
  )
}

export default App