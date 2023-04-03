import { Category } from "../bookSchemas/bookSchema"



export class createBookDTO {
    readonly title: string
    readonly author: string
    readonly price: number
    readonly status: number
    readonly image: string
    readonly category: Category
}