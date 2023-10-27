import { createContext, useState, useContext } from "react";
// type
type IsSideBarDisplayContextType = boolean;
type CloseSideBarHandlerContextType = () => void;
type SideBarOpenProviderPropsType = {
  children: any;
};

// initial value
// const initialIsSideBarDisplayContext: IsSideBarDisplayContextType = true;
// const initialCloseSideBarHandlerContext: CloseSideBarHandlerContextType =
//   () => {};

const IsSideBarDisplayContext =
  createContext<IsSideBarDisplayContextType>(true);
const CloseSideBarHandlerContext = createContext<
  CloseSideBarHandlerContextType | undefined
>(undefined);

// useContext
export const useIsSideBarDisplay = () => useContext(IsSideBarDisplayContext);
export const useCloseSideBarHandler = () => {
  const closeSideBarHandler = useContext(CloseSideBarHandlerContext);

  if (!closeSideBarHandler) {
    throw new Error("closeSideBarHandler is null");
  }

  return closeSideBarHandler;
};
// Provider
export const SideBarOpenProvider = ({
  children,
}: SideBarOpenProviderPropsType) => {
  const [isSideBarDisplay, setIsSideSideBarDisplay] =
    useState<IsSideBarDisplayContextType>(true);
  const closeSideBarHandler = () => {
    setIsSideSideBarDisplay((prevIsSideBarDisplay) => !prevIsSideBarDisplay);
    console.log(isSideBarDisplay);
  };

  return (
    <CloseSideBarHandlerContext.Provider value={closeSideBarHandler}>
      <IsSideBarDisplayContext.Provider value={isSideBarDisplay}>
        {children}
      </IsSideBarDisplayContext.Provider>
    </CloseSideBarHandlerContext.Provider>
  );
};
