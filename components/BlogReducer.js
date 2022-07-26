export const BlogReducer = (state,action)=>{
    switch(action.type){
        case 'ADD':
            return{
                ...state,
               data:action.payload
            }
         default:
             return state  
    }
 }