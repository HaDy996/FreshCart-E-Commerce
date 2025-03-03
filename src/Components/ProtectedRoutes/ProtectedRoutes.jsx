import { Navigate } from "react-router-dom";
import Login from "../Login/Login";


export default function ProtectedRoutes(props) {
    if (localStorage.getItem("userToken")) {

        return props.children;
    } else {
        return <Navigate to={'/login'}/> 
            
    //     <div className=" bg-main text-white p-3 rounded-xl">
    //     <h1 className="text-5xl text-center my-3">Not Authorized</h1>
    //     <h4 className="text-center text-xl">" Please Login First "</h4> 
    // </div>

    }
}