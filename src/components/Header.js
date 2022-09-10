import React from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context"

export default function Header() {
    const context = React.useContext(ThemeContext)
    const headerBgClass = context.scrolled ? "headerBg" : "headerBgGradient"

    const [menuOn, setMenuOn] = React.useState(false)

    function toggleMenu() {
        setMenuOn(prev => !prev)
    }

    return (
        <header className={headerBgClass}>
            <img src="/images/disney-plus-logo.png" alt="disney-logo" />
            <ul className="headerMenu">
                <li><Link to="/"><i className="menuIcon fa-solid fa-house fa-sm"></i> <span className="menuItemTxt">HOME</span></Link></li>
                <li><Link to="/search"><i className="menuIcon fa-solid fa-magnifying-glass fa-sm"></i> <span className="menuItemTxt">SEARCH</span></Link></li>
                <li><Link to="/favorites"><i className="menuIcon fa-solid fa-plus fa-sm"></i> <span className="menuItemTxt">MY FAVORITES</span></Link></li>
                <li><Link to="/films"><span className="menuItemTxt">FILMS</span></Link></li>
            </ul>


            {/* <div className={`menu ${ menuOn ? "moveDown" : undefined }`} >
                <li><Link to="/"><i className="menuIcon fa-solid fa-house fa-sm"></i> <span className="menuItemTxt">HOME</span></Link></li>
                <li><Link to="/search"><i className="menuIcon fa-solid fa-magnifying-glass fa-sm"></i> <span className="menuItemTxt">SEARCH</span></Link></li>
                <li><Link to="/favorites"><i className="menuIcon fa-solid fa-plus fa-sm"></i> <span className="menuItemTxt">MY FAVORITES</span></Link></li>
                <li><Link to="/films"><span className="menuItemTxt">FILMS</span></Link></li>
            </div> */}

            <div className={`hamburgerBtn`} onClick={toggleMenu}>
                <div className={`hamburgerBar ${menuOn ? "topBar" : undefined}`}></div>
                <div className={`hamburgerBar ${menuOn ? "middleBar" : undefined}`}></div>
                <div className={`hamburgerBar ${menuOn ? "bottomBar" : undefined}`}></div>
            </div>
            <Link to="/Login"><span className="loginBtn"><i className="loginIcon fa-solid fa-user fa-lg"></i></span></Link>

        
        </header>
    )
}


{/* <nav>
    <div className={`menu ${ menuOn ? "moveDown" : undefined }`} >
        <Link to="/" className={`menuItem ${active("/")}`}>Home</Link>
        <Link to="/products" className={`menuItem ${active("/products")}`}>Products</Link>
    </div>

    <div className={`hamburgerBtn`} onClick={toggleMenu}>
    <div className={`hamburgerBar ${menuOn ? "topBar" : undefined}`}></div>
    <div className={`hamburgerBar ${menuOn ? "middleBar" : undefined}`}></div>
    <div className={`hamburgerBar ${menuOn ? "bottomBar" : undefined}`}></div>
    </div>
</nav> */}