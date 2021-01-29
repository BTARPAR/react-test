import React, {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {Dessert} from './types'
import {getAllDessert} from './queries'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import DessertList from './views/DessertList'
import AddDessert from './views/AddDessert'
import {useDessertState} from './provider/DessertProvider'

export default function Routes() {

	const {error, data} = useQuery<{
		desserts: Array<Dessert>;
	}>(getAllDessert)

	const {getData} = useDessertState()

	useEffect(() => {
		if (data !== undefined && !error) {
			getData(data.desserts)
		}
	}, [data, error])

	return (
		<main className="ml-auto mr-auto pl3 pr3 pt4 bg-near-white min-vh-100">
			<div className="w-80 center">
				<Router>
					<Route path="/" exact component={DessertList}/>
					<Route path="/add" exact component={AddDessert}/>
				</Router>
			</div>
		</main>
	)
}
