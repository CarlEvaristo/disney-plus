import React from "react"
import { useNavigate } from 'react-router-dom'
import { SignIn } from "../firebase-config"
import { ThemeContext } from "../context"

export default function PopUp() {
    const context = React.useContext(ThemeContext)
    const [showPopUp, setShowPopUp] = React.useState(true)
    const navigate = useNavigate()

    function handleClick() {
        setShowPopUp(false)
    }
    React.useEffect(()=>{
        !showPopUp && navigate('/')
    },[showPopUp])


    return ((!context.user && showPopUp) && 
            <div id="overlay" onClick={handleClick}>
                <div className="popup" onClick={e => e.stopPropagation()}>  {/* //when clicking the overlay close modal => but not after clicking modal itself !! */}
                    <SignIn location="popup"/>
                </div>
            </div>
            )
    
}