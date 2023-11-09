import { createContext, useState } from "react";

export interface IAuth {
    accessToken?: string;
}

export interface IAuthContext {
    auth?: IAuth;
    setAuth?: React.Dispatch<React.SetStateAction<IAuth>>;
}

const AuthContext = createContext<IAuthContext>({});

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<IAuth>({});
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;