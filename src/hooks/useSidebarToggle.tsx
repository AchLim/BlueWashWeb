import { useContext } from 'react';
import SidebarToggleContext from "../components/contexts/SidebarToggleContext";


const useSidebarToggle = () => {
    const { isToggle, toggleSidebar } = useContext(SidebarToggleContext);

    if (!toggleSidebar) {
        throw new Error("useSidebarToggle is outside SidebarToggleProvoider!");
    }

    return { isToggle, toggleSidebar};
}

export default useSidebarToggle;