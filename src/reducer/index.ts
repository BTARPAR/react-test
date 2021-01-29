import {Action, Dessert, State} from '../types'

export const initialState: State = {
	desserts: []
}

export const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'FETCHED': {
			const desserts = action.payload
			return {...state, desserts}
		}
		case 'ADD': {
			const dessert = action.payload
			const desserts = [...state.desserts, dessert]
			return {...state, desserts}
		}
		case 'DELETE': {
			const dessertIds = action.payload
			const desserts = dessertIds.reduce((res: Dessert[], id: number) => {
				return res.filter((dessert) => dessert.id !== id)
			}, state.desserts)
			return {...state, desserts}
		}
		case 'RESET': {
			return {desserts: []}
		}
		default:
			return state
	}
}
