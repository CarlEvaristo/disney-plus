import React from "react"
import { ThemeContext } from "../context"
import Hero from "../components/Hero"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"

export default function Home() {
    const context = React.useContext(ThemeContext)

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
    },[])


    return (
        <main> 
            <Hero />
        </main>
    ) 
}   


