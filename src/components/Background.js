import React from "react"
import { ThemeContext } from "../context"

export default function Background() {
    const context = React.useContext(ThemeContext)
    
    const desktopgradient = "rgba(0, 0, 0, 0.74) 3vh,rgba(0, 0, 0, 0.353) 13vh,rgba(0, 0, 0, 0) 50vh,rgba(0, 0, 0, 0.17)75vh,rgba(0, 0, 0, 0.511) 90vh,rgba(0, 0, 0, 0.81) 98vh)"
    const mobileGradient = "rgba(0, 0, 0, 0.74) 2vh,rgba(0, 0, 0, 0.353) 10vh,rgba(0, 0, 0, 0) 25vh,rgba(0, 0, 0, 0.17)33vh,rgba(0, 0, 0, 0.511) 40vh,rgba(0, 0, 0, 1) 45vh)"

    const mobileFormat = window.matchMedia("(max-width: 600px)")
    const gradient = mobileFormat.matches ? mobileGradient : desktopgradient

    const backGround = context.channel === "admin" ? 
        {backgroundImage: `linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)`} : context.channel !== null ? 
        {backgroundImage: `linear-gradient(to bottom, ${gradient}, url("/images/background/${context.channel}-background.jpg")`} : 
        {background: `linear-gradient(to bottom, ${gradient}, #4e5675`}


    return backGround
}

