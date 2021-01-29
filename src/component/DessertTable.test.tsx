import {
	render,
	screen,
	cleanup,
	fireEvent,
} from '@testing-library/react';
import DessertTable from './DessertTable'
import { Dessert } from '../types';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import {DessertContext} from '../provider/DessertProvider'

afterEach(cleanup);

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache(),
});

test('renders items correctly', () => {
	render(
		<BrowserRouter>
			<ApolloProvider client={client}>
				<DessertContext.Provider
					value={{
						dispatch: () => {},
						state: {
							desserts: [
								{
									id: 1,
									name: 'Ice Cream',
									fat: 14.26,
									carbs: 32.45,
									protein: 4.68,
									calories: 267
								} as Dessert,
								{
									id: 2,
									name: 'Chocolate Moose',
									fat: 25.69,
									carbs: 27.37,
									protein: 7.07,
									calories: 355
								} as Dessert,
								{
									id: 3,
									name: 'Cheesecake',
									fat: 18.00,
									carbs: 20.40,
									protein: 4.40,
									calories: 257
								} as Dessert,
								{
									id: 4,
									name: 'Pudding',
									fat: 5.33,
									carbs: 51.22,
									protein: 8.37,
									calories: 288
								} as Dessert,
								{
									id: 5,
									name: 'Peach Crisp',
									fat: 15.65,
									carbs: 89.32,
									protein: 4.06,
									calories: 499
								} as Dessert
							],
						},
					}}
				>
					<DessertTable />
				</DessertContext.Provider>
			</ApolloProvider>
		</BrowserRouter>
	);
	const cell = screen.getByText(/Ice Cream/i);
	expect(cell).toBeInTheDocument();
});

test('sorting works as expected', () => {
	const { getByTestId } = render(
		<BrowserRouter>
			<ApolloProvider client={client}>
				<DessertContext.Provider
					value={{
						dispatch: () => {},
						state: {
							desserts: [
								{
									id: 1,
									name: 'Ice Cream',
									fat: 14.26,
									carbs: 32.45,
									protein: 4.68,
									calories: 267
								} as Dessert,
								{
									id: 2,
									name: 'Chocolate Moose',
									fat: 25.69,
									carbs: 27.37,
									protein: 7.07,
									calories: 355
								} as Dessert,
								{
									id: 3,
									name: 'Cheesecake',
									fat: 18.00,
									carbs: 20.40,
									protein: 4.40,
									calories: 257
								} as Dessert,
								{
									id: 4,
									name: 'Pudding',
									fat: 5.33,
									carbs: 51.22,
									protein: 8.37,
									calories: 288
								} as Dessert,
								{
									id: 5,
									name: 'Peach Crisp',
									fat: 15.65,
									carbs: 89.32,
									protein: 4.06,
									calories: 499
								} as Dessert
							],
						},
					}}
				>
					<DessertTable />
				</DessertContext.Provider>
			</ApolloProvider>
		</BrowserRouter>
	);
	const carbsHeadCell = screen.getByText('carbs');
	const tableBody = getByTestId('table-body');

	// Before Sort
	expect(tableBody.firstChild?.textContent?.includes('Ice Cream')).toBe(false);
	fireEvent.click(carbsHeadCell);

	//After sort
	expect(tableBody.firstChild?.textContent?.includes('Peach Crisp')).toBe(true);

	//Ascending
	fireEvent.click(carbsHeadCell);
	expect(tableBody.firstChild?.textContent?.includes('Cheesecake')).toBe(true);
});

test('deleting works', () => {
	let desserts = [
		{
			id: 1,
			name: 'Ice Cream',
			fat: 14.26,
			carbs: 32.45,
			protein: 4.68,
			calories: 267
		} as Dessert,
		{
			id: 2,
			name: 'Chocolate Moose',
			fat: 25.69,
			carbs: 27.37,
			protein: 7.07,
			calories: 355
		} as Dessert,
		{
			id: 3,
			name: 'Cheesecake',
			fat: 18.00,
			carbs: 20.40,
			protein: 4.40,
			calories: 257
		} as Dessert,
		{
			id: 4,
			name: 'Pudding',
			fat: 5.33,
			carbs: 51.22,
			protein: 8.37,
			calories: 288
		} as Dessert,
		{
			id: 5,
			name: 'Peach Crisp',
			fat: 15.65,
			carbs: 89.32,
			protein: 4.06,
			calories: 499
		} as Dessert
	];
	const dispatch = jest.fn((action) => {
		const dessertIds = action.payload
		desserts = dessertIds.reduce((res: Dessert[], id: number) => {
			return res.filter((dessert) => Number(dessert.id).toString() !== Number(id).toString())
		}, desserts)
	})
	const { getAllByTestId, rerender, getByText } = render(
		<BrowserRouter>
			<ApolloProvider client={client}>
				<DessertContext.Provider
					value={{
						dispatch,
						state: {
							desserts,
						},
					}}
				>
					<DessertTable />
				</DessertContext.Provider>
			</ApolloProvider>
		</BrowserRouter>
	);

	const checkboxes = getAllByTestId('selector-box');

	fireEvent.click(checkboxes[0]);
	fireEvent.click(checkboxes[1]);
	fireEvent.click(checkboxes[2]);

	const deleteButton = getByText('DELETE');
	fireEvent.click(deleteButton);

	expect(dispatch).toBeCalledWith({
		type: 'DELETE',
		payload: ['1','2','3'],
	});

	// After delete

	rerender(
		<BrowserRouter>
			<ApolloProvider client={client}>
				<DessertContext.Provider
					value={{
						dispatch,
						state: {
							desserts,
						},
					}}
				>
					<DessertTable />
				</DessertContext.Provider>
			</ApolloProvider>
		</BrowserRouter>
	);
	const currentCheckboxes = getAllByTestId('selector-box');
	expect(currentCheckboxes.length).toBe(2);
});
