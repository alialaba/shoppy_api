import Button from "./Button";
import axios from "axios";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react"

export default function SignupScreen({history}){

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")


    // useEffect(()=>{
    //     if(localStorage.getItem("authToken")){
    //         history.push("/")
    //     }
    // },[history])
    const registerHandler = async (e)=>{
        e.preventDefault();

        const config ={
            headers:{
                "Content-type" : "application/json",
                "Accept" : 'application/json'

            }
        }

        //if confirm password dont match password

        if(password !== confirmpassword){
            //set passwod and confirm password to empty
            setPassword("");
            setConfirmPassword("");

        setTimeout(()=>{
        setError("Password do not match")
        }, 5000)
        }

        const data = {
            firstname,lastname, username, password, confirmpassword
        }
        axios.post('/api/auth/signup', data, config)
            .then(response => {
                // Handle successful signup
                console.log(response)
            })
            .catch(error => {
                // Handle signup error
                console.log(error)
            });

       /* try {
            const {data} = await axios.post("/api/auth/signup",
            {firstname,lastname, username, password, confirmpassword})
             console.log(data)
             //set local store to token recieved from post req.
            //  localStorage.setItem("authToken", data.token);

            //  history.push("/") //to props of history
            
        } catch (error) {
            setError(error.response.data.error);

            setTimeout(()=>{
               setError("")
            }, 5000)
            
        }*/

        

    }

    return(
        <div>
         
        <form onSubmit={registerHandler}>
        <h3>Signup</h3>
        {/* display error if an error occurred */}
        {error && <span>{error}</span>}
            <div className="field">
                <label  htmlFor="firstname">Firstname</label>
                <input type="text" id="fname" value={firstname} onChange={(e)=> setFirstname(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="lastname">Lastname</label>
                <input type="text" id="lname" value={lastname} onChange={(e)=> setLastname(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input required type="text" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input required type="text" id="confirmpassword" value={confirmpassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </div>
                 <Button text="Signup"/>

                 <span>Already have an account? <Link to="/login">Login</Link></span>

        </form>
        </div>
    )
}