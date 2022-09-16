import React from "react"
import {useParams} from "react-router-dom"
import { ThemeContext } from "../context"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"
import PopUpMessage from "../components/PopupMessage"
import DetailImage from "../components/DetailImage"

////////////////import to save favo movie for current user to database
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"// firestore crud methods
import {db} from "../firebase-config"       
///////////////

export default function Detail() {
    const context = React.useContext(ThemeContext)
    const usersCollectionRef  = collection(db, "users")
    const [users,setUsers] = React.useState([])
    const {id} = useParams()   //render details based on movie id 
    const [idParam, setIdParam] = React.useState("")
    const [showPopup, setShowPopup] = React.useState(false)
    const [isFavo, setIsFavo] = React.useState()

    React.useEffect(()=>{
        context.toggleChannel(null)
        ScrollTop()
        setIdParam(id)
        readUsers()
        isFavorite()
    },[])

    React.useEffect(()=>{
        isFavorite()
    },[users])

    const films = context.movies ? context.movies : null  //important short circuiting in case the data is not yet here
    const film = (films && (films.filter(film => film.imdbID === idParam ))[0]) || {imdbID: ``}

    ////////////////code to save favo movie for current user to database
    async function readUsers() {
        //=> getDocs method: CRUD: READ ALL DOCUMENTS (records) in collection
        const dataUsers = await getDocs(usersCollectionRef)
        setUsers(dataUsers.docs.map(doc => ({...doc.data(), id:doc.id})))  //.data() method return fields from document
    }

    function isFavorite(){
        const userId = users && context.user ? users.filter(user => user.uid === context.user.uid)[0] : []
        const favoMovies = userId && userId.favo || []
        favoMovies.length && setIsFavo(favoMovies.includes(id) ? true : false)

        // const favoMovies = users.length && (users.filter(user => user.uid === context.user.uid))[0].favo || []
        // favoMovies.length && setIsFavo(favoMovies.includes(id) ? true : false)
    }

    function addFavo(imdbID) {
        const userId = (users.filter(user => user.uid === context.user.uid))[0].id
        const favoMovies = (users.filter(user => user.uid === context.user.uid))[0].favo || []
        const newFavoMovies = !favoMovies.includes(imdbID) ? [...favoMovies, id] : [...favoMovies]
        //=> updateDoc method: CRUD: UPDATE DOCUMENT => LET OP UPDATE HEEFT "DOC" NODIG
        const userDoc = doc(db, "users", userId)  // doc() METHOD GET A DOCUMENT (ARGS: DB, COLLECTION, DOC ID)
        updateDoc(userDoc, {favo: newFavoMovies})    //promiss (but I don't use the response here (.then/.catch)
        setIsFavo(true)
        setShowPopup(true)

   }
   ///////////////////////

   function togglePopup(){
       setShowPopup(prevValue => !prevValue)
   }


    return (
        <>
        {showPopup ? <PopUpMessage message={`${film.title} added to your favourites`} toggle={togglePopup}/> :
        context.user ?
        <main> 
            <div className="detailContainer" >
                <div className="detailPoster">
                    <DetailImage film={film} key={film.imdbID} />
                </div>

                <div className="detailTxt">
                    <div className="detailHeader">
                        <h1>{film.title}</h1>
                        <div className="detailBtns">
                            <a className="trailerBtn" href={`https://www.imdb.com/title/${film.imdbID}/`} target="_blank" >trailer</a>
                            <button className={`favoBtn ${isFavo && "favoBtnDisabled"}`} onClick={() => addFavo(film.imdbID)} ><i className="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <p>{film.description}</p>
                    <br/>
                    <a href={`https://www.imdb.com/title/${film.imdbID}/`} target="_blank" >Go to {film.title} page on IMDB</a>
                </div>
                
            </div>
        </main> : 
        <PopUp />}
        </>
    )
}




