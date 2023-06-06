import axios from "axios";
import { useEffect, useState } from "react"
import Button from "./Button";

export default function PrivateScreen({history}){

const [privateData, setPrivateData] = useState("");
const [error, setError] = useState("");


useEffect(()=>{

    //if auth token not found redirect to login screen
    if(!localStorage.getItem("authToken")){
        history.push("/login");
    }

    const fetchPrivateData = async()=>{
        const config ={
            headers:{
                "Content-type" : "application/json",
                Authorization: `Bearer  ${localStorage.getItem("authToken")}`
            }
        }
        
        try {
            const {data} = await axios.get("/api/private", config)
            //allow user to get access
            setPrivateData(data.data)
            
        } catch (error) {
            localStorage.removeItem("authToken");
            setError("You're not authorized, Please try to login")
            
        }

        }

        fetchPrivateData()

}, [history]);


//logout user token
const logoutHandler =()=>{
    localStorage.removeItem("authToken");
    history.push("/login");
}
    return(
        error ? <span>{error}</span> :
        
        <>
        <div style={{backgroundColor:"green", color:"white"}}>{privateData}</div>
        <Button text="logout" onClick={logoutHandler}/>
        </>
    )
}