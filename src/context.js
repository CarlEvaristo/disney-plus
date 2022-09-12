import React from "react"

const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [movies, setMovies] = React.useState([])
    const [scrolled, setScrolled] = React.useState(0)
    const [channel, setChannel] = React.useState(null)
    const [allFetched, setAllFetched] = React.useState(false)
    const [pixarFetched, setPixarFetched] = React.useState(false)
    const [disneyFetched, setDisneyFetched] = React.useState(false)
    const [marvelFetched, setMarvelFetched] = React.useState(false)
    const [starwarsFetched, setStarwarsFetched] = React.useState(false)

    const pixarMovies = ["Lightyear", "Luca", "Turning Red", "Soul", "Onward", "Coco", "Toy Story 4", "Cars 3", "Incredibles 2", "Inside Out", "The Good Dinosaur", "Finding Dory", "Monsters University", "Brave", "Cars 2", "Ratatouille", "Cars", "WALL-E", "Toy Story 3", "The Incredibles", "Finding Nemo"]
    const disneyMovies = ["Frozen", "Moana", "Encanto", "Lion King", "The Little Mermaid"]
    const marvelMovies = ["Spider-Man", "The Amazing Spider-Man", "Spider-Man: Homecoming", "Spider-Man Far From Home", "Doctor Strange", "Avengers Endgame"]
    const starwarsMovies = ["Star Wars", "Star Wars Return of the Jedi", "Star Wars the Empire Strikes Back", "Star Wars The Phantom Menace", "Star Wars Attack of the Clones", "Star Wars Revenge of the Sith", "Star Wars The Force Awakens", "Star Wars The Last Jedi", "Star Wars The Rise of Skywalker"]

    React.useEffect(() => {
        if (pixarFetched && disneyFetched && marvelFetched && starwarsFetched) {
           setAllFetched(true)}   //
   },[pixarFetched, disneyFetched, marvelFetched, starwarsFetched])   //, marvelFetched, starwarsFetched

    
    React.useEffect(() => {
        Promise.all(pixarMovies.map(movie =>
            fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${movie}`)
                .then(resp => resp.json())
                .then(data => {
                    setMovies(prevMovies => [...prevMovies, {...data.Search[0], channel: "pixar" } ] )
                })
                .catch(err => console.log("Pixar Error:", err))
        )).then(allData => allData).finally(setPixarFetched(true))
    },[])

    React.useEffect(() => {
        Promise.all(disneyMovies.map(movie =>
            fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${movie}`)
                .then(resp => resp.json())
                .then(data => {
                    setMovies(prevMovies => [...prevMovies, {...data.Search[0], channel: "disney" } ])
                })
                .catch(err => console.log("Disney Error:", err))
        )).then(allData => allData).finally(setDisneyFetched(true))
    },[])


    React.useEffect(() => {
        Promise.all(marvelMovies.map(movie =>
            fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${movie}`)
                .then(resp => resp.json())
                .then(data => {
                    setMovies(prevMovies => {
                        return [...prevMovies, {...data.Search[0], channel: "marvel" } ] 
                    })
                })
                .catch(err => console.log("Marvel Error:", err))
        )).then(allData => allData).finally(setMarvelFetched(true))
    },[])

    React.useEffect(() => {
        Promise.all(starwarsMovies.map(movie =>
            fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${movie}`)
                .then(resp => resp.json())
                .then(data => {
                    setMovies(prevMovies => {
                        return [...prevMovies, {...data.Search[0], channel: "starwars" } ] 
                    })
                })
        )).then(allData => allData).finally(setStarwarsFetched(true))
    },[])
  

    console.log(movies)
    // code for the scroll event => header tranparent => hero darker
    function listenScrollEvent(e){
        setScrolled(window.scrollY)
    }

    React.useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        
        return () =>
            window.removeEventListener('scroll', listenScrollEvent);
    }, []);

    // function to toggle current channel
    function toggleChannel(channel){
        setChannel(channel)
    }

    return (
        <ThemeContext.Provider value={{movies, scrolled, channel, toggleChannel, allFetched}}>		
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