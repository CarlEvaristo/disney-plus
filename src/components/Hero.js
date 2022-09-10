import React from "react"
import { ThemeContext } from "../context"
import ChannelMenu from "../components/ChannelMenu"

export default function Hero() {
    const context = React.useContext(ThemeContext)
    const channel = context.channel

    return(
        <div className="container">
            <img className="heroImg" src="./images/caroussel-1.jpg" />
            <ChannelMenu />
        </div> 
    )
}