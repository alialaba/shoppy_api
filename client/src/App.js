import {Routes, Route} from "react-router-dom";

//ROUTING
import PrivateRoute from "./components/Routing/PrivateRoute";

//Screen 
import PrivateScreen from "./components/screens/PrivateScreen";
import SignupScreen from "./components/screens/SignupScreen";
import LoginScreen from "./components/screens/LoginScreen";
import ForgetPasswordScreen from "./components/screens/ForgetPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

function App() {
  return (
    <div className="App">
      {/* <Signup/> */}
     <Routes>
      {/* <PrivateRoute path="/" element={<PrivateScreen/>}/> */}

      {/* <Route path="/"
       element={<PrivateRoute>
         <PrivateScreen/>
        </PrivateRoute>}/> */}
      <Route path="/login" element={<LoginScreen/>}/>
       <Route path="/signup" element={<SignupScreen/>}/>
      <Route path="/forgetpassword" element={<ForgetPasswordScreen/>}/>
      <Route path="/passwordreset:resetToken" element={<ResetPasswordScreen/>}/> 
      <Route path="*" element={<h1>Oops! Page not found!</h1>}/>
     </Routes>
    </div>
  );
}

export default App;
