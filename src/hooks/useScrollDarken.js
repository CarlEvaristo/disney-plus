import React from "react"
import { ThemeContext } from "../context"

export default function useScrollDarken() {
    const scrollContext = React.useContext(ThemeContext)

    return  (scrollContext.scrolled < 150) ? "overlayLight" :
    (scrollContext.scrolled < 200) ? "overlayMedium" : 
    (scrollContext.scrolled < 300) ? "overlayDarker" :
    "overlayDarkest"

}
