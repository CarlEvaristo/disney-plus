import React from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context"

export default function Films() {
    const context = React.useContext(ThemeContext)

    return(
        <main>
            <h1>Films</h1>
            <Link to="/films/1">Film 1</Link>
            <Link to="/films/2">Film 2</Link>
            <Link to="/films/3">Film 3</Link>
            <Link to="/films/4">Film 4</Link>
        </main>
    )
}