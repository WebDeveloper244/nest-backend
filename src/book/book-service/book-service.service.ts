import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { Types } from 'mongoose';
import { Book } from '../bookSchemas/bookSchema';



@Injectable()
export class BookServiceService {
    constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>) { }

    async findAll() {
        const books = await this.bookModel.find()
        return {
            result: books,
            data: true
        }
    }

    async create(book: Book) {
        const saveBook = await this.bookModel.create(book)
        return {
            body: saveBook,
            data: true,
        }
    }

    async FindDocbyId(Id: string) {
        const docToFindById = await this.bookModel.findById(Id)
        console.log(docToFindById);

        if (!docToFindById) {
            throw new NotFoundException('Book Not Found')
        }

        return docToFindById
    }



    // async updateDocByID(Id: string, book: Book) {
    //     const updateBookById = await this.bookModel.findByIdAndUpdate(Id, book, {
    //         new: true,
    //         runValidators: true
    //     })
    //     return updateBookById
    // }



    // async updateDocByID(id: string, book: Book) {
    //     const docToUpDate = await this.bookModel.findByIdAndUpdate(
    //       { _id: id },
    //       book
    //     );
    //     return docToUpDate;
    //   }
    
    // async updateProductById(id: string, payload: any): Promise<any> {
    //     const updatedProduct = await this.bookModel.findByIdAndUpdate(
    //       id,
    //       payload,
    //       { new: true },
    //     );
    //     return updatedProduct;
    //   }

    async updateDocByID(id: string, book: Book) {
        const existingDoc = await this.bookModel.findById(id);
        if (!existingDoc) {
          // The document doesn't exist, so create a new one
          const newDoc = new this.bookModel(book);
          return newDoc.save();
        } else {
          // The document already exists, so update it
          return this.bookModel.updateOne({ _id: id }, book);
        }
      }


    async DelDocbyId(Id: string) {
        const docToDeleteById = await this.bookModel.findByIdAndDelete(Id)

        if (docToDeleteById) {
            return {
                result: 'Doc Delete SuccessFully',
                data: true
            }
        }
    }

    async softDelDocbyId(Id: string) {
        const docToSoftDeleteById = await this.bookModel.findByIdAndUpdate(
            { _id: Id },
            { status: 1 }
        )

        if (docToSoftDeleteById) {
            return {
                result: 'Doc Delete SuccessFully',
                data: true
            }
        }
    }

}
