import React from "react"
import { ThemeContext } from "../context"
import Hero from "../components/Hero"

export default function Home() {
    const context = React.useContext(ThemeContext)
    
    React.useEffect(()=>{
        context.toggleChannel(null)
    },[])

    return(
        <main> 
            <Hero />
            <div className="container">
            </div>
        </main>
    )
}   


