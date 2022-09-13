import React from "react"
import { ThemeContext } from "../context"

export default function Background() {
    const context = React.useContext(ThemeContext)
    const backGround = context.channel !== null ? `url("/images/${context.channel}-background.jpg")` : `#4e5675` 
    console.log("Hoi",backGround, context.channel)
    
    const bgStyle = {
        background:`#4e5675` ,
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.74) 10px, rgba(0, 0, 0, 0.353) 20%,rgba(0, 0, 0, 0) 50%,rgba(0, 0, 0, 0.17),rgba(0, 0, 0, 0.511) 80%,rgba(0, 0, 0, 0.81) 90%), ${backGround}`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover"
    }

    return bgStyle
}
