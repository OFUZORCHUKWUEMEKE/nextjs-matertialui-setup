import { createContext, useReducer } from "react";
import { BlogReducer } from "./BlogReducer";


export const BlogContext = createContext()

const INITIAL_STATE ={
    data:null
}

const BlogProvider = ({children})=>{
    const [state,dispatch] = useReducer(BlogReducer,INITIAL_STATE)
   return(
       <BlogContext.Provider value={{dispatch,state}}>
           {children}
       </BlogContext.Provider>
   )
}

export default BlogProvider
