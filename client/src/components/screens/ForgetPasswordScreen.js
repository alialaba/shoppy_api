import axios from "axios";
import { useState } from "react"
import Button from "./Button"
export default function ForgetPasswordScreen(){

    const [email, setEmail] =useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const forgetPasswordHandler = async(e)=>{
        e.preventDefault()

        const config ={
            headers:{
                "Content-type" :"application/json"
            }
        }

        try {

            const {data} = await axios.post("/api/auth/forgetpassword", {email}, config);
            setSuccess(data.data);
            
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }



    }



    return(
        <form onSubmit={forgetPasswordHandler}>
            <h3>Forget Password</h3>
            {error && <span>{error}</span>}
            {success && <span>{success}</span>}
            <div className="field">
            <p>Please enter email your register with, will send you a reset password</p>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required value={email} onChange={(e)=> setEmail(e.target.value) }/>
            </div>

            <Button type="submit" text="forget password"/>
        </form>
    )
}