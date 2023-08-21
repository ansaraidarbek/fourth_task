import React, {createContext} from 'react'

// To maintain the current view of the page 
// where MessageEditor will create MessageEditor panel 
// and MessagePreview will create MessagePreview panal
export type WindowState = 'none' | 'MessageEditor' | 'MessagePreview'

interface State{
    window: WindowState,
    setWindow:React.Dispatch<React.SetStateAction<WindowState>>
}

const initialState ={
    window: 'none' as WindowState,
    setWindow: () =>{}
}

export const StateContext = createContext<State>(initialState)
