import {createContext} from 'react'

/** Because the tree can be hugely nested 
 *  Children should call function from context rather that directly using Callbacks
 */
interface UpdateFunctions{
    setHistory:Function,
    updateText:Function,
    deleteBlock: Function
}

const initialState ={
    setHistory: () =>{},
    updateText: () =>{},
    deleteBlock: () =>{}
}

const UpdateContext = createContext<UpdateFunctions>(initialState)

export default UpdateContext