import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Films from "./pages/Films"
import Detail from "./pages/Detail"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"
import Header from "./components/Header"
import Brand from "./pages/Brand"
import { ThemeContext } from "./context"
import Background from "./components/Background"

function App() {
  const context = React.useContext(ThemeContext)
  // const backGround = context.channel !== null ? `${context.channel}Bg` : "background" 

  return (
    // <div className={backGround}>   
    <div style={Background()}>   
      <Header/>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/brand/:brand" element={ <Brand /> } />
        <Route exact path="/films" element={ <Films /> } />
        <Route path="/films/:id" element={ <Detail /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/favorites" element={ <Favorites /> } />
      </Routes>
    </div>
  )
}

export default App