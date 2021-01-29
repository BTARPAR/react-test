import {useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import Button from '../component/Button'
import Input from '../component/Input'
import {addDataQuery} from '../queries'
import {useDessertState} from '../provider/DessertProvider'
import {useState} from 'react'

const AddDessert = () => {
	const history = useHistory()
	const [dessert, setDessert] = useState({
		name: '',
		calories: 0,
		fat: 0,
		carbs: 0,
		protein: 0
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target
		setDessert((prevState) => {
			return {
				...prevState,
				[name]: name === 'name' ? value : parseInt(value)
			}
		})
	}

	const [addDessert] = useMutation(addDataQuery)

	const {addData} = useDessertState()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log({dessert})
		const {data, errors} = await addDessert({
			variables: {
				...dessert
			}
		})
		if (data && !errors) {
			addData(data.addDessert)
			history.push('/')
		}
	}

	return (
		<div className="bg-white pa5">
			<div className="bg-gold pa2 white b flex items-center justify-center mb4">
				<span className="material-icons-outlined">warning_</span>
				Please fill all details before you submit
			</div>
			<form onSubmit={handleSubmit}>
				<Input
					required
					label="Dessert Name"
					name="name"
					value={dessert.name}
					onChange={handleChange}
				/>
				<Input
					required
					label="Calories"
					name="calories"
					value={dessert.calories}
					type="number"
					onChange={handleChange}
				/>
				<Input
					required
					label="Fat"
					name="fat"
					value={dessert.fat}
					type="number"
					onChange={handleChange}
				/>
				<Input
					required
					label="Carbs"
					name="carbs"
					value={dessert.carbs}
					type="number"
					onChange={handleChange}
				/>
				<Input
					required
					label="Protein"
					name="protein"
					value={dessert.protein}
					type="number"
					onChange={handleChange}
				/>
				<Button className="bg-green white w-100 justify-center" icon="done">
					SUBMIT
				</Button>
			</form>
		</div>
	)
}

export default AddDessert
