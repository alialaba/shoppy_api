import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import Button from "./Button"
export default function ResetPasswordScreen({match}){

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    const resetPasswordHandler = async (e)=>{
     e.preventDefault();

     const config ={
        headers:{
            "Content-type" :"application/json"
        }
     }

     if(password !== confirmpassword){
        setPassword("");
        setConfirmPassword("");

        setTimeout(()=>{
          setError("");
        }, 5000)

        return setError("Password don't match");

     }

     try {

        const {data} = await axios.put(`/api/auth/passwordreset/${match.params.resetToken}`, {password}, config);

        console.log(data)
        setSuccess(data.data)
        
     } catch (error) {
        setError(error.response.data.error);

        setTimeout(() => {
            setError("")
        }, 5000);
        
     }
    }

    return(
        <form onSubmit={resetPasswordHandler}>
            <h3>Reset Password</h3>
            {error && <span>{error}</span>}
            {success && (<span>{success} <Link to="/login" /></span>)}
            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="text"  required id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="password">Confirm Password</label>
                <input type="text" required id="confirmpassword" value={confirmpassword} onChange={(e)=> setConfirmPassword(e.target.value) }/>
            </div>
            <Button type="submit" text="Reset Password"/>
        </form>
    )
}