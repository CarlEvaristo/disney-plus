import React from "react"
import { storage } from "../firebase-config"                                  // to access firebase storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"  // to save img to storage and return img url

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"// firestore crud methods
import {db} from "../firebase-config"                                                     // to access firestore db

export default function UploadForm() {
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
        poster: ""
    })
    const [movies, setMovies] = React.useState([])
    const moviesCollectionRef = collection(db, "movies")   

    function resetAdmin(){
        setImgUrl(null)
        setNewMovie({
            title: "",
            year: "",
            imdbID: "",
            channel: "",
            poster: ""
        })
        setMovies([])
        readMovies()
    }

    //CRUD METHODS:
    async function readMovies() {
        //=> getDocs method: CRUD: READ ALL DOCUMENTS (records) in collection
        const data = await getDocs(moviesCollectionRef)
        setMovies(data.docs.map(doc => ({...doc.data(), id:doc.id})))  //.data() method return fields from document (name/age) 
      }
    
    React.useEffect(()=> {
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

    return(
        <div className="formDisplay">  
            <h2>Upload Movie Image to Server:</h2> 
            <form className='adminForm' onSubmit={handleImgSubmit}>
                <input type='file' />
                <button>Upload Image</button>
                {imgUrl && <p>Image Upload Successful. {imgUrl}</p>}
            </form> 
            <br/>
            <br/>
            <h2>Enter Movie Data:</h2>
            <form className='adminForm' onSubmit={handleMovieSubmit}>
                <input type="text" name="title" placeholder="Title..." onChange={handleChange} value={newMovie.title} />
                <input type="number" name="year" placeholder="Year..." onChange={handleChange} value={newMovie.year} />
                <input type="text" name="imdbID" placeholder="IMDB id..." onChange={handleChange} value={newMovie.imdbID} />
                {/* <input type="text" name="channel" placeholder="channel..." onChange={handleChange} value={newMovie.channel} /> */}
                <select value={newMovie.channel} onChange={handleChange} name="channel" >
                    <option value="">-- Channel... --</option>  
                    <option value="disney">Disney</option>       
                    <option value="pixar">Pixar</option>
                    <option value="marvel">Marvel</option>
                    <option value="starwars">StarWars</option>
                    <option value="natgeo">National Geographic</option>
                    <option value="star">Star</option>
                </select>
                <button>Upload Movie</button>
            </form>
            <br/>
            <br/>
            {movies.length !== 0 && <h2>Live Movie Data:</h2>}
            <hr/>
            {movies.map(movie => (
                <div key={movie.id}>
                <p>Title: {movie.title}</p>
                <p>Year: {movie.year}</p>
                <p>imdbID: {movie.imdbID}</p>
                <p>Channel: {movie.channel}</p>
                <button onClick={() => deleteMovie(movie.id)} className="delete">Delete Movie</button>
                <hr/>
                </div>
                )) 
            }
        </div>

    )
}
