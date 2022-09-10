import React from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context"

export default function Header() {
    const context = React.useContext(ThemeContext)
    const headerBgClass = context.scrolled ? "headerBg" : "headerBgGradient"

    return (
        <header className={headerBgClass}>
            <img src="/images/disney-plus-logo.png" alt="disney-logo" />
            <ul className="headerMenu">
                <li><Link to="/"><i className="menuIcon fa-solid fa-house fa-sm"></i> <span className="menuItemTxt">HOME</span></Link></li>
                <li><Link to="/search"><i className="menuIcon fa-solid fa-magnifying-glass fa-sm"></i> <span className="menuItemTxt">SEARCH</span></Link></li>
                <li><Link to="/favorites"><i className="menuIcon fa-solid fa-plus fa-sm"></i> <span className="menuItemTxt">MY FAVORITES</span></Link></li>
                <li><Link to="/films"><span className="menuItemTxt">FILMS</span></Link></li>
            </ul>
            <Link to="/Login"><span className="loginBtn"><i className="loginIcon fa-solid fa-user fa-lg"></i></span></Link>
        </header>
    )
}