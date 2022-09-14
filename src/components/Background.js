import React from "react"
import { ThemeContext } from "../context"

export default function Background() {
    const context = React.useContext(ThemeContext)
        
    const backGround = context.channel === "admin" ? {background: "grey"} : context.channel !== null ? 
        {backgroundImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.74) 3vh, 
            rgba(0, 0, 0, 0.353) 13vh,
            rgba(0, 0, 0, 0) 50vh,
            rgba(0, 0, 0, 0.17)75vh,
            rgba(0, 0, 0, 0.511) 90vh,
            rgba(0, 0, 0, 0.81) 98vh), url("/images/background/${context.channel}-background.jpg")`} : 
                    {background: `linear-gradient(to bottom, 
                        rgba(0, 0, 0, 0.74) 3vh, 
                        rgba(0, 0, 0, 0.353) 13vh,
                        rgba(0, 0, 0, 0) 50vh,
                        rgba(0, 0, 0, 0.17)75vh,
                        rgba(0, 0, 0, 0.511) 90vh,
                        rgba(0, 0, 0, 0.81) 98vh), #4e5675`}


    return backGround
}

