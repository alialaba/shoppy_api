import {Navigate} from "react-router-dom"

export default function PrivateRoute({element: Component, ...rest}){
    //pass component and rest as props then render requested component.
    //if {authtoken} is store in localstorage else redirect to login

    return(
       <div>
       {localStorage.getItem("authToken") ? <Component {...rest}/> : <Navigate to="/login"/> }

      </div>
    )
}