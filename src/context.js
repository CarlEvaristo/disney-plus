import React from "react"
const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [movies, setMovies] = React.useState([])
    const [scrolled, setScrolled] = React.useState(0)
    const [channel, setChannel] = React.useState(null)

    const pixarMovies = ["Lightyear", "Luca", "Turning Red", "Soul", "Onward", "Coco", "Toy Story 4", "Cars 3", "Incredibles 2", "Inside Out", "The Good Dinosaur", "Finding Dory", "Monsters University", "Brave", "Cars 2", "Ratatouille", "Cars", "WALL-E", "Toy Story 3", "The Incredibles", "Finding Nemo"]
    // const pixarMovies = ["Lightyear", "Luca", "Turning Red", "Soul"]

    React.useEffect(()=>{
        pixarMovies.forEach(item => {
            fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${item}`)
            .then(response => response.json())
            .then(data => setMovies(prevMovies => [...prevMovies, data.Search[0]]))
        })

    },[])


    // code for the scroll event => header tranparent => hero darker
    function listenScrollEvent(e){
        setScrolled(window.scrollY)
    }

    React.useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        
        return () =>
            window.removeEventListener('scroll', listenScrollEvent);
    }, []);


    return (
        <ThemeContext.Provider value={{movies, scrolled, channel, setChannel}}>		
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContextProvider, ThemeContext}


// async function searchMovies(query) {
//     const response = await fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${query}`)
//     let movieArr = await response.json()
//     getMovies(movieArr.Search)
// }

// async function getMovies(array) {
//     mainContainer.innerHTML = ""
//     for (let movie of array) {
//         let response2 = await fetch(`https://www.omdbapi.com/?apikey=d5f56738&i=${movie.imdbID}`)
//         let data2 = await response2.json()
//         movie.Rating = data2.imdbRating
//         movie.Runtime = data2.Runtime
//         movie.Genre = data2.Genre
//         movie.Plot = data2.Plot;
//         (movie.Poster === "N/A") && (movie.Poster = "images/no-image-available.jpg")
//         searchArray.push(movie)
//         renderHtml(movie) 
//     }
// }