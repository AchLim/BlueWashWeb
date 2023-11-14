import { createContext, useState, useContext } from "react";

export interface ISidebarToggleContext {
    isToggle?: boolean;
	toggleSidebar?: () => void;
}

const SidebarToggleContext = createContext<ISidebarToggleContext>({});

export const SidebarToggleProvider = ({ children }: any) => {
    const [isToggle, setIsToggle] = useState<boolean>(true);

	const toggleSidebar = () => {
		setIsToggle(!isToggle);
	}

    return (
        <SidebarToggleContext.Provider value={{ isToggle, toggleSidebar }}>
            {children}
        </SidebarToggleContext.Provider>
    )
}

export default SidebarToggleContext;