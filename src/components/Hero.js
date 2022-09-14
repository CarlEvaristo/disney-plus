import React from "react"
import { ThemeContext } from "../context"
import ChannelMenu from "../components/ChannelMenu"
import Caroussel from "./Caroussel"

export default function Hero() {
    const context = React.useContext(ThemeContext)
    const channel = context.channel


    //slides code ==========================================
    const [slidePosition, setSlidePosition] = React.useState(0)
    const slides = ["./images/caroussel-1.jpg", "./images/caroussel-2.jpg"]
    const totalSlides = slides.length

    function nextSlide(){
        if (slidePosition === totalSlides-1) {
            setSlidePosition(0)
        } else {
            setSlidePosition(prev => prev + 1)
        }
    }

    function prevSlide(){
        if (slidePosition === 0) {
            setSlidePosition(totalSlides-1)
        } else {
            setSlidePosition(prev => prev - 1)
        }
    }

    //slides code ==========================================
 

    return(
        <>            
            <Caroussel/>
            <div className="container">
                <ChannelMenu />
            </div> 
        </>
    )
}