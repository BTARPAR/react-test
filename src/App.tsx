import React from 'react'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {DessertProvider} from './provider/DessertProvider'
import './App.css'
import Routes from './Route'

function App() {
	const client = new ApolloClient({
		uri: 'http://localhost:4000',
		cache: new InMemoryCache()
	})
	return (
		<ApolloProvider client={client}>
			<DessertProvider>
				<Routes/>
			</DessertProvider>
		</ApolloProvider>
	)
}

export default App
