import { useContext } from "react"
import AuthContext from "../components/contexts/AuthProvider";

const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);

    if (!auth || !setAuth) {
        throw new Error("useAuth is outside AuthProvider!");
    }

    return { auth, setAuth };
}

export default useAuth;