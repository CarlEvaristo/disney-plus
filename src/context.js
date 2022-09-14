import React from "react"

const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [user, setUser] = React.useState(false)
    const [movies, setMovies] = React.useState([])
    const [scrolled, setScrolled] = React.useState(0)
    const [channel, setChannel] = React.useState(null)
    const [allFetched, setAllFetched] = React.useState(false)

    const movieTitles = {
        pixar: ["Lightyear", "Luca", "Turning Red", "Soul", "Onward", "Coco", "Toy Story 4", "Cars 3", "Incredibles 2", "Inside Out", "The Good Dinosaur", "Finding Dory", "Monsters University", "Brave", "Cars 2", "Ratatouille", "Cars", "WALL-E", "Toy Story 3", "The Incredibles", "Finding Nemo"],
        disney: ["Frozen", "Moana", "Encanto", "Lion King", "The Little Mermaid"],
        marvel: ["Spider-Man", "The Amazing Spider-Man", "Spider-Man: Homecoming", "Spider-Man Far From Home", "Doctor Strange", "Avengers Endgame"],
        starwars: ["Star Wars", "Star Wars Return of the Jedi", "Star Wars the Empire Strikes Back", "Star Wars The Phantom Menace", "Star Wars Attack of the Clones", "Star Wars Revenge of the Sith", "Star Wars The Force Awakens", "Star Wars The Last Jedi", "Star Wars The Rise of Skywalker"]
    }
    
   React.useEffect(() => {
        const fetchArr = Object.values(movieTitles).flat().map(title => fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${title}`))
        Promise.all(fetchArr)
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => {
                setMovies(Object.keys(movieTitles).flatMap(channel => (
                    data.splice(0, movieTitles[channel].length).map(({Search}) => ({...Search[0], channel}))
                )))
            })
            .catch(err => console.log("Error:", err))
            .finally(() => setAllFetched(true))
    }, [])
  

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
        <ThemeContext.Provider value={{movies, scrolled, channel, toggleChannel, allFetched, user, setUser}}>		
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContextProvider, ThemeContext}

