import React from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context"

export default function ChannelMenu(){
    const context = React.useContext(ThemeContext)

    return (
        <div className="channelMenu">
            <Link to="/brand/:disney"><div className="btnWrapper">
                <span className="channelBtn">
                    <img src="/images/disney-btn.png" />
                    <video autoplay="true" loop="true"><source src="images/disney-animation.mp4" type="video/mp4"/></video>
                </span>
            </div></Link>
            <Link to="/brand/:pixar"><div className="btnWrapper">
                <span className="channelBtn">
                    <img src="/images/pixar-btn.png" />
                    <video autoplay="true" loop="true"><source src="images/pixar-animation.mp4" type="video/mp4"/></video>
                </span>
            </div></Link>
            <Link to="/brand/:marvel"><div className="btnWrapper">
                <span className="channelBtn">
                    <img src="/images/marvel-btn.png" />
                    <video autoplay="true" loop="true"><source src="images/marvel-animation.mp4" type="video/mp4"/></video>
                </span>
            </div></Link>
            <Link to="/brand/:starwars"><div className="btnWrapper">
                <span className="channelBtn">
                    <img src="/images/starwars-btn.png" />
                    <video autoplay="true" loop="true"><source src="images/starwars-animation.mp4" type="video/mp4"/></video>
                </span>
            </div></Link>
            <Link to=""><div className="btnWrapper">
                <span className="channelBtn">
                    <img src="/images/natgeo-btn.png" />
                    <video autoplay="true" loop="true"><source src="images/natgeo-animation.mp4" type="video/mp4"/></video>
                </span>
            </div></Link>
            <Link to=""><div className="btnWrapper">
                <span className="channelBtn">
                    <img src="/images/star-btn.png" />
                    <video autoplay="true" loop="true"><source src="images/star-animation.mp4" type="video/mp4"/></video>
                </span>
            </div></Link>
        </div>
    )
}
