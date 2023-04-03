import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    Advanture = 'Advanture',
    Classic = 'Classic',
    Anime = 'Anime'
}

@Schema({
    timestamps: true
})

export class Book {

    @Prop()
    title: string

    @Prop()
    author: string

    @Prop()
    price: number

    @Prop()
    category: Category

    @Prop({default:0})
    status:number

    @Prop({
        type: String,
    })
    image: string;
}

export const BookSchema = SchemaFactory.createForClass(Book)