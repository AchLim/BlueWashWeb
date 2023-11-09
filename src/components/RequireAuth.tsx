import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"


const RequiredAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    
}