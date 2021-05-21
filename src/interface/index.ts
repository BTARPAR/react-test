import {keys} from '../types'
import {InputHTMLAttributes} from 'react'

type KEYS = 'calories' | 'fat' | 'carbs' | 'protein' | 'name'

export interface SortState {
    on: KEYS;
    direction: 'asc' | 'desc';
}


export interface HeaderProps {
    noOfSelected: number;

    handleDelete(): Promise<any>
}

export interface TitleProps {
    title: string;

    handleSort(arg: string): void
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
