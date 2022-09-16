import React from "react"
import { ThemeContext } from "../context"
import FilmImage from "../components/FilmImage"
import ScrollDarken from "../hooks/useScrollDarken"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"
////////////////import to save favo movie for current user to database
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"// firestore crud methods
import {db} from "../firebase-config"  
import FavoImage from "../components/FavoImage"

///////////////

export default function Favorites() {

    const context = React.useContext(ThemeContext)
    const films = context.movies || []

    ////////////////code to save favo movie for current user to database
    const usersCollectionRef  = collection(db, "users")
    const [users,setUsers] = React.useState([])
    const scrollDarken = ScrollDarken()
    const [hovered, setHovered] = React.useState(false)

    async function readUsers() {
        //=> getDocs method: CRUD: READ ALL DOCUMENTS (records) in collection
        const dataUsers = await getDocs(usersCollectionRef)
        setUsers(dataUsers.docs.map(doc => ({...doc.data(), id:doc.id})))  //.data() method return fields from document (name/age) 
    }
    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
        readUsers()
    },[])


    function deleteFavo(movieId) {
        const id = users.filter(user => user.uid === context.user.uid)[0].id
        const favoIds = currUser && currUser.favo || []
        const newFavoMovies = favoIds.filter(favoId => favoId !== movieId)
        //=> updateDoc method: CRUD: UPDATE DOCUMENT => LET OP UPDATE HEEFT "DOC" NODIG
        const userDoc = doc(db, "users", id)  // doc() METHOD GET A DOCUMENT (ARGS: DB, COLLECTION, DOC ID)
        updateDoc(userDoc, {favo: newFavoMovies})    //promiss (but I don't use the response here (.then/.catch)
        readUsers()
    }   

    const currUser = users && context.user ? users.filter(user => user.uid === context.user.uid)[0] : []
    const favoIds = currUser && currUser.favo || []
    const favoMovies = films.filter(film => favoIds.includes(film.imdbID))
    const filmsElements = favoMovies.map(film => (
        <div key={film.id} onClick={() => deleteFavo(film.imdbID)} >
            <FavoImage film={film} key={film.imdbID} deleteFavo={deleteFavo}/>
            <button className="delete"><i class="fa-solid fa-minus"></i></button>

        </div>)
    )
    
    return ( 
        <>
          { context.user ? 
            <main className={scrollDarken}> 
                <div className="noHero"></div>
                <div className="container">
                    <h1>Your Favorites</h1>
                    <div className="filmsContainer">
                        {filmsElements}
                    </div>
                </div>
            </main> : <PopUp />}
        </>
    )

}   


