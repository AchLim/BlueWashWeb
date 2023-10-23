import { SideBarOpenProvider } from "./SideBarOpenContext.tsx";

const ContextProviders = ({ children }: any) => {
  return <SideBarOpenProvider>{children}</SideBarOpenProvider>;
};

export default ContextProviders;
