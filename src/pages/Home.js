import React from "react"
import { ThemeContext } from "../context"
import Hero from "../components/Hero"

export default function Home() {
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(null)
    },[])

    const darken =  (context.scrolled < 100) ? "overlayLight" :
    (context.scrolled < 300) ? "overlayMedium" : 
    (context.scrolled < 500) ? "overlayDarker" :
    "overlayDarkest"

    return(
        <main className={`${darken}`}> 
            <Hero />
            <div className="container">
            </div>
        </main>
    )
}   


