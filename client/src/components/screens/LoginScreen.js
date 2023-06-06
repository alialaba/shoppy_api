import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Button from "./Button";
export default function LoginScreen({history}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // console.log(history);

    // useEffect(()=>{
    //     if(localStorage.getItem("authToken")){
    //         history.push("/");
    //     }
    // }, [history])


    const loginHandler = async (e)=>{
        e.preventDefault();

        const config={
            headers:{
                "Content-type":"application/json"
            }
        };


       try {
        const {data} = await axios.post("/api/auth/login", {email, password}, config);
          console.log(data)
        localStorage.setItem("authToken", data.token);
        history.push("/")

       } catch (error) {

        setError(error.response.data.error);
        setTimeout(()=>{
            setError("")
        }, 5000)
        
       }

    }
    return(
        <form onSubmit={loginHandler}>
            <h3>Login</h3>
            {error && <span>{error}</span>}
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" tabIndex={1} value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="password">Password
                <Link to="/forgetpassword" tabIndex={4}>Forget Password</Link>
                </label>
                <input type="text" id="password" tabIndex={2} value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <Button tabIndex={3} text="Login"/>

            <span>Dont have an account? <Link to="/signup">Signup</Link></span>
            
        </form>
    )
}