import React from "react"
import {useParams} from "react-router-dom"
import { ThemeContext } from "../context"

export default function Detail() {
    const context = React.useContext(ThemeContext)
    // console.log(context.movies)
    const {id} = useParams()   //render details based on movie id 

    return (
        <h1>Detail {id}</h1>
    )
}