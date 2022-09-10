import React from "react"
import { ThemeContext } from "../context"

export default function Hero({content}) {
    const context = React.useContext(ThemeContext)
    const bgDarken =  (context.scrolled < 100) ? "overlayLight" :
                      (context.scrolled < 300) ? "overlayMedium" : 
                      "overlayDark"

    return(
        <main className={bgDarken}>  
            <div className="filmsContainer">
                {content}
            </div>
        </main>
    )
}