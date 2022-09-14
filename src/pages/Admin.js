import React from "react"
import { ThemeContext } from "../context"
import ScrollTop from "../hooks/useScrollTop"
import PopUp from "../components/Popup"
import UploadForm from "../components/UploadForm"
import { auth, useAuthState } from "../firebase-config"

export default function Admin() {
    const context = React.useContext(ThemeContext)
    
    React.useEffect(()=>{
        context.toggleChannel("admin")
        ScrollTop()
    },[])
    
    const [user] = useAuthState(auth)
    // user ? user.id
    console.log(user)
    
    return context.user ? (     // this has to admin user
        <main > 
            <div className="noHero"></div>
            <div className="container">
                <h1>Admin</h1>
                <UploadForm />
            </div>
        </main>
    ) : <PopUp />

}   


