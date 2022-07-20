import React, { createContext, useReducer } from 'react'
import { Reducer } from './reducer'

const initialGlobalValue = {
    hunger: 0,
    sleepTime: 500,
    clickeable: true,
    screenAnimationPlaying: false,
    screen: "playScreen",
    mouthOpen: false
}

export const globalContext = createContext({dispatch: Reducer(initialGlobalValue, ""), state: initialGlobalValue})

export default function GlobalContextProvider(props) {
    const [state, dispatch] = useReducer(Reducer, initialGlobalValue)

    return (
        <globalContext.Provider value={{state, dispatch}}>
            {props.children}
        </globalContext.Provider>
    )
}
