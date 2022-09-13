import React from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeContext } from "../context"
import { SignIn } from "../firebase-config"

export default function Header() {
    const context = React.useContext(ThemeContext)
    const [menuOn, setMenuOn] = React.useState(false)

    const headerBgClass = (context.scrolled || menuOn) ? "headerBg" : "headerBgGradient"

    function toggleMenu() {
        setMenuOn(prev => !prev)
    }

    const location = useLocation()
    const path = location.pathname

    return (
        <header className={headerBgClass}>
            <Link to="/"> <img src="/images/disney-plus-logo.png" alt="disney-logo" /> </Link>
            {!menuOn ?
                <>
                <div className="headerMenu">
                    <Link to="/"><i className="menuIcon fa-solid fa-house fa-sm"></i> <span className="menuItemTxt">HOME</span></Link>
                    <Link to="/search"><i className="menuIcon fa-solid fa-magnifying-glass fa-sm"></i> <span className="menuItemTxt">SEARCH</span></Link>
                    <Link to="/favorites"><i className="menuIcon fa-solid fa-plus fa-sm"></i> <span className="menuItemTxt">MY FAVORITES</span></Link>
                    <Link to="/films"><span className="menuItemTxt">FILMS</span></Link>
                </div> 
                <div className="headerMenu">
                {(path !== "/") && <SignIn  location="header"/>}  {/* (path !== "/") => only show sign in/out on content pages => not on home page */}
                </div> 
                </>
                :
                <div className="menu moveDown">
                    <Link to="/"><span className="menuItemTxt">HOME</span></Link>
                    <Link to="/search"><span className="menuItemTxt">SEARCH</span></Link>
                    <Link to="/favorites"><span className="menuItemTxt">MY FAVORITES</span></Link>
                    <Link to="/films"><span className="menuItemTxt">FILMS</span></Link>
                    <SignIn location="header"/>
                </div> 
            }
 
            


            <div className={`hamburgerBtn`} onClick={toggleMenu}>
                <div className={`hamburgerBar ${menuOn ? "topBar" : undefined}`}></div>
                <div className={`hamburgerBar ${menuOn ? "middleBar" : undefined}`}></div>
                <div className={`hamburgerBar ${menuOn ? "bottomBar" : undefined}`}></div>
            </div>

        
        </header>
    )
}


