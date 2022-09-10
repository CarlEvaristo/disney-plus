import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import Hero from "../components/Hero"

export default function Home() {
    const context = React.useContext(ThemeContext)
    const channel = context.channel

    const films = context.movies
    const filmsElements = films.map(film => {
        console.log(film)
        return (
            <FilmImage film={film} key={film.imdbID}/>
    )})

    return(
        <Hero content={filmsElements}/>
    )
}