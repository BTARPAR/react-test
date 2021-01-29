import {useMutation} from '@apollo/client'
import {useDessertState} from '../provider/DessertProvider'
import {resetDataQuery} from '../queries'
import Button from '../component/Button'
import DessertTable from '../component/DessertTable'
// import Button from '../components/Button';
// import NutritionTable from '../components/NutritionTable';
// import useDispatch from '../hooks/useDispatch';

const DessertList = () => {
	const [resetData] = useMutation(resetDataQuery)
	const {reset} = useDessertState()
	const handleReset = async () => {
		const {errors} = await resetData()
		!errors && reset()
	}
	return (
		<>
			<div className="flex">
				<h1 className="f2 flex-auto">Dessert List</h1>
				<Button className="bg-red white self-center" icon="refresh" onClick={handleReset}>
					RESET DATA
				</Button>
			</div>
			<DessertTable />
		</>
	)
}

export default DessertList
