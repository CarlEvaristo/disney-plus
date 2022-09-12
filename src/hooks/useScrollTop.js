import React from "react"

export default function useScrollTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}


