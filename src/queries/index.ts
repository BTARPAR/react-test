import {gql} from '@apollo/client'

export const getAllDessert = gql`
        query Desserts {
            desserts {
                id
                name
                calories
                fat
                protein
                carbs
            }
        }
    `
export const resetDataQuery = gql`
        mutation {
            resetData {
                message
                success
            }
        }
    `
export const deleteDataQuery = gql`
        mutation DeleteDesserts($dessertIds: [ID]!) {
            deleteDesserts(dessertIds: $dessertIds) {
                message
                success
            }
        }
    `

export const addDataQuery = gql`
        mutation AddDessert(
            $name: String!
            $calories: Float!
            $fat: Float!
            $carbs: Float!
            $protein: Float!
        ) {
            addDessert(
                dessert: {
                    name: $name
                    calories: $calories
                    fat: $fat
                    carbs: $carbs
                    protein: $protein
                }
            ) {
                id
                name
                calories
                fat
                carbs
                protein
            }
        }
    `
