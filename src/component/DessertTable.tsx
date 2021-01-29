import {useState} from 'react'
import {useMutation} from '@apollo/client'
import {SortState} from '../interface'
import {useDessertState} from '../provider/DessertProvider'
import {deleteDataQuery} from '../queries'
import {keys} from '../types'
import Header from './Header'
import Title from './Title'


const DessertTable = () => {
	const {state: {desserts}, removeData} = useDessertState()
	const [selected, setSelected] = useState<{ [key: string]: boolean }>({})
	const [sort, setSort] = useState<SortState>({
		on: 'name',
		direction: 'asc'
	})

	const [deleteDesserts] = useMutation(deleteDataQuery)

	const handleSort = (on: keys) => {
		setSort((prevState) => {
			return {
				on,
				direction: prevState.direction === 'asc' ? 'desc' : 'asc'
			}
		})
	}

	const handleDelete = async () => {
		const dessertIds = Object.keys(selected)
		try {
			removeData(dessertIds)
			await deleteDesserts({
				variables: {dessertIds}
			})
			setSelected({})
		} catch (error) {
			console.log(error)
		}
	}

	const sortedList = desserts
		.slice()
		.sort((a, b) => {
				if (a[sort.on] > b[sort.on]) {
					return sort.direction === 'asc' ? 1 : -1
				} else {
					return sort.direction === 'asc' ? -1 : 1
				}
			}
		)

	const noOfSelected = Object.keys(selected).filter((key) => selected[key]).length

	const generateTitle = ['dessert', 'calories', 'fat', 'carbs', 'protein'].map((title, index) => {
		return <Title title={title} handleSort={handleSort} key={index}/>
	})

	return (
		<>
			<Header noOfSelected={noOfSelected} handleDelete={handleDelete}/>
			<table className="w-100" cellSpacing={0}>
				<thead>
				<tr className="bg-white pointer">
					<th className="fw6 bb b--black-20 pt3 pb3 pr3 tc">
						<input
							className="mr2"
							type="checkbox"
							value="selectAll"
							checked={
								Object.keys(selected).every(
									(key) => selected[key]
								) &&
								Object.keys(selected).length ===
								desserts.length
							}
							onChange={(event) => {
								setSelected(() => {
									return desserts.reduce((res, dessert) => ({
										...res, [dessert.id ? dessert.id : '']: event.target.checked
									}), {})
								})
							}}
						/>
					</th>
					{generateTitle}
				</tr>
				</thead>
				<tbody className="lh-copy" data-testid="table-body">
				{sortedList.map((dessert) => (
					<tr key={dessert.id}>
						<td className="pv3 pr3 bb b--black-20 tc">
							<input
								data-testid="selector-box"
								className="mr2"
								type="checkbox"
								value={dessert.id}
								checked={!!selected[dessert.id ? dessert.id : '']}
								onChange={(event) => {
									setSelected(() => {
										return {
											...selected, [dessert.id ? dessert.id : '']: event.target.checked
										}
									})
								}}
							/>
						</td>
						<td className="tc pv3 b--black-20 pr3 bb">
							{dessert.name}
						</td>
						<td className="tc pv3 b--black-20 pr3 bb">
							{dessert.calories}
						</td>
						<td className="tc pv3 b--black-20 pr3 bb">
							{dessert.fat}
						</td>
						<td className="tc pv3 b--black-20 pr3 bb">
							{dessert.carbs}
						</td>
						<td className="tc pv3 b--black-20 pr3 bb">
							{dessert.protein}
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</>
	)
}

export default DessertTable
