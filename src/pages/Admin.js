import React from "react"
import { ThemeContext } from "../context"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"
import { storage } from "../firebase-config"                                  // to access firebase storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"  // to save img to storage and return img url

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"// firestore crud methods
import {db} from "../firebase-config"                                                     // to access firestore db

export default function Admin() {
    const context = React.useContext(ThemeContext)
    
    React.useEffect(()=>{
        context.toggleChannel("admin")
        ScrollTop()
    },[])

    // the following code is to save images to firebase storage ========================================
    const [imgUrl, setImgUrl] = React.useState(null)

    function handleImgSubmit(e) {
        e.preventDefault()
        const file = e.target[0]?.files[0]

        if (!file) return

        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                //setProgresspercent(progress)
            },(error) => {
                console.log(alert)
                alert(error)
            },() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("URL", downloadURL)
                setImgUrl(downloadURL)
                })
            }
        )
    }

    // the following code is to save movie data input + img url to database =============================

    const [newMovie, setNewMovie] = React.useState({
        title: "",
        year: "",
        imdbID: "",
        channel: "",
        description: "",
        poster: ""
    })
    const [movies, setMovies] = React.useState([])
    const [users, setUsers] = React.useState([])
    const moviesCollectionRef = collection(db, "movies")   
    const usersCollectionRef  = collection(db, "users")   

    function resetAdmin(){
        setImgUrl(null)
        setNewMovie({
            title: "",
            year: "",
            imdbID: "",
            channel: "",
            description: "",
            poster: ""
        })
        setMovies([])
        setUsers([])
        readMovies()
        readUsers() 
    }

    //CRUD METHODS:
    async function readMovies() {
        //=> getDocs method: CRUD: READ ALL DOCUMENTS (records) in collection
        const data = await getDocs(moviesCollectionRef)
        setMovies(data.docs.map(doc => ({...doc.data(), id:doc.id})))  //.data() method return fields from document (name/age) 
    }
    
    async function readUsers() {
        //=> getDocs method: CRUD: READ ALL DOCUMENTS (records) in collection
        const dataUsers = await getDocs(usersCollectionRef)
        setUsers(dataUsers.docs.map(doc => ({...doc.data(), id:doc.id})))  //.data() method return fields from document (name/age) 
    }

    React.useEffect(()=> {
        readUsers()
        readMovies()

    },[])   // only runs initially

    function handleChange(event) {
        const {name, value} = event.target
        setNewMovie(prevMovie => ({...prevMovie, poster: imgUrl, [name]:value}))  //promiss (but I don't use the response here (.then/.catch)
            .then(readMovies())
    }

    function handleMovieSubmit(e) {
        e.preventDefault()
        //=> addDoc method: CRUD: CREATE NEW DOCUMENT (record) in collection
            addDoc(moviesCollectionRef, newMovie)  //promiss (but I don't use the response here (.then/.catch)
                .then(resetAdmin())
        }

    function deleteMovie(id){     
        //=> deleteDoc method: CRUD: DELETE DOCUMENT  => LET OP DELETE HEEFT OOK "DOC" NODIG
            const moviesDoc = doc(db, "movies", id)  // doc() METHOD GET A DOCUMENT (ARGS: DB, COLLECTION, DOC ID)
            deleteDoc(moviesDoc)                    //promiss (but I don't use the response here (.then/.catch)
            .then(readMovies())
        }

    function makeAdmin(id, admin) {
        //=> updateDoc method: CRUD: UPDATE DOCUMENT => LET OP UPDATE HEEFT "DOC" NODIG
        const userDoc = doc(db, "users", id)  // doc() METHOD GET A DOCUMENT (ARGS: DB, COLLECTION, DOC ID)
        updateDoc(userDoc, {admin: !admin})    //promiss (but I don't use the response here (.then/.catch)
        .then(readUsers())
    }

    const isAdmin = context.user && !context.user.isAnonymous && users.length && (users.filter(user => user.uid === context.user.uid))[0].admin || false
    
    return (
        isAdmin ? 
        <main > 
            <div className="noHero"></div>
            <div className="container">
                <h1 style={{color:"#000"}}>Admin</h1>

                <div className="formDisplay">  
                    <h2>Upload Movie Image to Server:</h2> 
                    <form className='adminForm' onSubmit={handleImgSubmit}>
                        <input type='file' required />
                        <button className="formBtn">Upload Image</button>
                    </form> 


                    {imgUrl && 
                    <>
                        <p>Image Upload Successful. {imgUrl}</p>
                        <br/>
                        <br/>
                        <h2>Enter Movie Data:</h2>
                        <form className='adminForm' onSubmit={handleMovieSubmit}>
                            <input type="text" name="title" placeholder="Title..." onChange={handleChange} value={newMovie.title} required />
                            <input type="number" name="year" placeholder="Year..." onChange={handleChange} value={newMovie.year} required />
                            <input type="text" name="imdbID" placeholder="IMDB id..." onChange={handleChange} value={newMovie.imdbID} required />
                            <input type="text" name="description" placeholder="Description..." onChange={handleChange} value={newMovie.description} required />
                            <select value={newMovie.channel} onChange={handleChange} name="channel" required >
                                <option value="">-- Channel... --</option>  
                                <option value="disney">Disney</option>       
                                <option value="pixar">Pixar</option>
                                <option value="marvel">Marvel</option>
                                <option value="starwars">StarWars</option>
                                <option value="natgeo">National Geographic</option>
                                <option value="star">Star</option>
                            </select>
                            <button className="formBtn">Upload Movie</button>
                        </form>
                    </>}
                    <br/>
                    <br/>
                    {movies.length !== 0 && <h2>Movies Data:</h2>}

                    {movies.map(movie => (
                        <div  className="adminBox" key={movie.id}>
                        <p>Title: {movie.title}</p>
                        <p>Year: {movie.year}</p>
                        <p>imdbID: {movie.imdbID}</p>
                        <p>Channel: {movie.channel}</p>
                        <button onClick={() => deleteMovie(movie.id)} className="delete">Delete Movie</button>

                        </div>
                        )) 
                    }
                    <br/>
                    {users.length !== 0 && <h2>Users Data:</h2>}

                    {users.map(user => (
                        <div className="adminBox" key={user.id}>
                            <p>User ID: {user.uid}</p>
                            <p>User email: {user.email}</p>
                            <p>Admin: {user.admin ? "Yes" : "No"}</p>
                            <p>Favorites: {user.favorites}</p>
                            <button onClick={() => makeAdmin(user.id, user.admin)} className="delete">{user.admin ? "Remove" : "Make"} Admin</button>
                        </div>
                        )) 
                    }
                </div>

            </div>
        </main> :
        <main> 
            <div className="noHero"></div>
            <div className="container">
                <h1 style={{color:"#000"}}>ADMIN ACCESS DENIED</h1>  
            </div>
        </main>
    )
}   


