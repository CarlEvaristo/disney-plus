import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Films from "./pages/Films"
import Detail from "./pages/Detail"
import Login from "./pages/Login"
import Header from "./components/Header"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"


function App() {
  return(
    <>
      <Header/>
      
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/films" element={ <Films /> } />
        <Route path="/films/:id" element={ <Detail /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </>
  )
}

export default App