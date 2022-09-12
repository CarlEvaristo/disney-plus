import React from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context"

export default function ChannelMenu(){
    const context = React.useContext(ThemeContext)

    return (
        <div className="channelMenu">
            <Link to="/brand/:disney"><span className="channelBtn" ><img src="/images/disney-btn.png" /></span></Link>
            <Link to="/brand/:pixar"><span className="channelBtn" ><img src="/images/pixar-btn.png" /></span></Link>
            <Link to="/brand/:marvel"><span className="channelBtn" ><img src="/images/marvel-btn.png" /></span></Link>
            <Link to="/brand/:starwars"><span className="channelBtn" ><img src="/images/starwars-btn.png" /></span></Link>
            <Link to=""><span className="channelBtn disabled-link" ><img src="/images/natgeo-btn.png" /></span></Link>
            <Link to=""><span className="channelBtn disabled-link" ><img src="/images/star-btn.png" /></span></Link>
        </div>
    )
}
