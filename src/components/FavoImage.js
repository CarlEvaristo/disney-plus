import React from "react"
import { Link } from "react-router-dom"

export default function DetailImage({film, deleteFavo}){

    return (
        <div className="filmBox"  >
            <Link to={`/films/${film.imdbID}`} onClick={e => e.stopPropagation()}>
                <img src={film.poster} alt={film.title} />
            </Link>
        </div>
    )
}



