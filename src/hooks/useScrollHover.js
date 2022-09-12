import React from "react"
import { ThemeContext } from "../context"

export default function useScrollHover() {
    const scrollContext = React.useContext(ThemeContext)

    return  (scrollContext.scrolled < 100) ? "overlayLight" :
    (scrollContext.scrolled < 300) ? "overlayMedium" : 
    (scrollContext.scrolled < 500) ? "overlayDarker" :
    "overlayDarkest"

}
