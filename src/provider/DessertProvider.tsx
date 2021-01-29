import {Action, State, Dessert} from '../types'
import React, {createContext, useContext, useReducer} from 'react'
import {initialState, reducer} from '../reducer'

export const DessertContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: {desserts: []},
	dispatch: (a: Action) => {
	}
})

export const useDessertState = () => {
	const {state, dispatch} = useContext(DessertContext)
	return {state, getData, reset, removeData, addData}

	function getData(desserts: Array<Dessert>) {
		dispatch({
			type: 'FETCHED',
			payload: desserts
		})
	}

	function reset() {
		dispatch({type: 'RESET'})
	}

	function removeData(selectedIDs: Array<string>) {
		dispatch({type: 'DELETE', payload: selectedIDs})
	}

	function addData(dessert: Dessert) {
		dispatch({type: 'ADD', payload: dessert})
	}
}

export const DessertProvider: React.FC = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<DessertContext.Provider value={{state, dispatch}}>
			{children}
		</DessertContext.Provider>
	)
}
