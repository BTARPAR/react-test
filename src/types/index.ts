export type keys = 'calories' | 'fat' | 'carbs' | 'protein' | 'name';

export type Dessert = {
	[key in keys]: number;
} & {
	name: string;
	id?: number;
};

export interface State {
	desserts: Array<Dessert>;
}

export interface Action {
	type: string;
	payload?: any;
}
