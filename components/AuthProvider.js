import { createContext,useReducer } from "react";

import {authReducer} from './AuthReducer'

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const AuthContext = createContext()


export const AuthProvider = ({children})=>{
     const [state,dispatch] =useReducer(authReducer,initialState)
    return (
        <AuthContext.Provider value={{state,dispatch}}>
             {children}
        </AuthContext.Provider>
    )
}
