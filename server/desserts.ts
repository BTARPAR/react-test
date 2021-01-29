import {Dessert} from '../src/types'

const INITIAL_STATE: Array<Dessert> = [
	{
		id: 1,
		name: 'Ice Cream',
		fat: 14.26,
		carbs: 32.45,
		protein: 4.68,
		calories: 267
	},
	{
		id: 2,
		name: 'Chocolate Moose',
		fat: 25.69,
		carbs: 27.37,
		protein: 7.07,
		calories: 355
	},
	{
		id: 3,
		name: 'Cheesecake',
		fat: 18.00,
		carbs: 20.40,
		protein: 4.40,
		calories: 257
	},
	{
		id: 4,
		name: 'Pudding',
		fat: 5.33,
		carbs: 51.22,
		protein: 8.37,
		calories: 288
	},
	{
		id: 5,
		name: 'Peach Crisp',
		fat: 15.65,
		carbs: 89.32,
		protein: 4.06,
		calories: 499
	}
]

class DessertSource {
	data: Array<Dessert> = []
	static ID = 5

	constructor() {
		this.data = INITIAL_STATE
	}

	getAllDesserts() {
		return this.data
	}

	getDessertByID({dessertId}: { dessertId: number }) {
		return this.data.find((dessert) => {
			return dessert.id === dessertId
		})
	}

	addDessert({dessert}: {
		dessert: {
			name: string;
			calories: number;
			fat: number;
			carbs: number;
			protein: number;
		};
	}) {
		DessertSource.ID += 1
		const id = DessertSource.ID
		this.data.push({id, ...dessert})
		return {id, ...dessert}
	}

	deleteDessert({dessertId}: { dessertId: number }) {
		console.log('dessertId', dessertId)
		const deletedDessert = this.data.find((dessert) => {
			return dessert.id === dessertId
		})
		console.log('deletedDessert', deletedDessert)

		const newData = this.data.filter((dessert) => dessert.id !== dessertId)
		this.data = newData
		return deletedDessert
	}

	deleteDesserts({dessertIds}: { dessertIds: number[] }) {
		dessertIds.map((dessertId) => {
			const newData = this.data.filter(
				(dessert) => dessert.id !== dessertId
			)
			this.data = newData
		})

		return {
			success: true,
			message: 'Desserts have been deleted'
		}
	}

	resetData() {
		this.data = []
		return {
			success: true,
			message: 'All data has been reset'
		}
	}
}

export default DessertSource
