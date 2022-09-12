import React from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeContext } from "../context"
import { SignIn } from "../firebase-config"

export default function Header() {
    const context = React.useContext(ThemeContext)
    const headerBgClass = context.scrolled ? "headerBg" : "headerBgGradient"
    const [menuOn, setMenuOn] = React.useState(false)

    function toggleMenu() {
        setMenuOn(prev => !prev)
    }

    const location = useLocation()
    const path = location.pathname

    return (
        <header className={headerBgClass}>
            <Link to="/"> <img src="/images/disney-plus-logo.png" alt="disney-logo" /> </Link>
            <ul className="headerMenu">
                <li><Link to="/"><i className="menuIcon fa-solid fa-house fa-sm"></i> <span className="menuItemTxt">HOME</span></Link></li>
                <li><Link to="/search"><i className="menuIcon fa-solid fa-magnifying-glass fa-sm"></i> <span className="menuItemTxt">SEARCH</span></Link></li>
                <li><Link to="/favorites"><i className="menuIcon fa-solid fa-plus fa-sm"></i> <span className="menuItemTxt">MY FAVORITES</span></Link></li>
                <li><Link to="/films"><span className="menuItemTxt">FILMS</span></Link></li>
            </ul>
                <div className="align-right">
                    {(path !== "/") && <SignIn  location="header"/>}   {/* (path !== "/") => only show sign in/out on content pages => not on home page */}
                </div>
            
        

            <div className={`hamburgerBtn`} onClick={toggleMenu}>
                <div className={`hamburgerBar ${menuOn ? "topBar" : undefined}`}></div>
                <div className={`hamburgerBar ${menuOn ? "middleBar" : undefined}`}></div>
                <div className={`hamburgerBar ${menuOn ? "bottomBar" : undefined}`}></div>
            </div>

        
        </header>
    )
}


