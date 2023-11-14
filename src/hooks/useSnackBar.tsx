import { useContext } from "react"
import SnackBarContext from "../components/contexts/SnackBarContext";

const useSnackBar = () => {
    const { snackBar, setSnackBar } = useContext(SnackBarContext);
    
    if (!setSnackBar) {
        throw new Error("useSnackBar is outside SnackBarProvider!");
    }

    return { snackBar, setSnackBar };
}

export default useSnackBar;