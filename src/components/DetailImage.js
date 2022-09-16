import React from "react"
import { Link } from "react-router-dom"

export default function DetailImage({film}){
    const [hovered, setHovered] = React.useState(false)

    function handleHover() {
        setHovered(prev => !prev)
    }

    return (
        <div className="detailBox">
            <img src={film.poster} alt={film.title} />
        </div>
    )
}



