import React from "react"

export default function PopUpMessage({message, toggle}) {
    const [showPopUp, setShowPopUp] = React.useState(true)

    function handleClick() {
        setShowPopUp(false)
        toggle()
    }

    return (showPopUp && 
                <div id="overlay" onClick={handleClick}>
                    <div className="popup popupMsg" onClick={e => e.stopPropagation()}>  {/* //when clicking the overlay close modal => but not after clicking modal itself !! */}
                        <h3>{message}</h3>
                    </div>
                </div>

    )
}