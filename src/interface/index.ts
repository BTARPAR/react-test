import {keys} from '../types'
import {InputHTMLAttributes} from 'react'

export interface SortState {
	on: keys;
	direction: 'asc' | 'desc';
}


export interface HeaderProps {
	noOfSelected: number;
	handleDelete(): Promise<any>
}

export interface TitleProps {
	title: string;
	handleSort(arg:string): void
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}
