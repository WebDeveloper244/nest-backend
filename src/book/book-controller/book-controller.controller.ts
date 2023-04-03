import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { BookServiceService } from '../book-service/book-service.service';
import { createBookDTO } from '../createBookDTO/create-book.dto';
import { updateBookDTO } from '../updateBookDTO/updateBookDto';

// export class CustomMulterOptions {
//     storage = diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         const randomName = Array(32)
//           .fill(null)
//           .map(() => Math.round(Math.random() * 16).toString(16))
//           .join('');
//         return cb(null, `${randomName}${extname(file.originalname)}`);
//       },
//     });
//   }

@Controller('bookController')
export class BookControllerController {
    constructor(private bookService: BookServiceService) { }

    @Get()
    async getDoc() {
        return this.bookService.findAll()
    }

    @Post()
    async createBook(@Body() book: createBookDTO) {
        return this.bookService.create(book)
    }

    @Get(':id')
    async findBookById(@Param('id') id: string) {
        return this.bookService.FindDocbyId(id)
    }

    // @Post()
    // async updateBookById(@Body('id') id: string, @Body('payLoad') updateBook: updateBookDTO) {
    //     return this.bookService.updateDocByID(id, updateBook)
    // }

    @Post(':id')
async updateProductById(
  @Param('id') id: string,
  @Body() payload: any,
): Promise<any> {
  const updatedProduct = await this.bookService.updateDocByID(
    id,
    payload,
  );
  return {
    Message: `Document has been Updated`,
    Result: updatedProduct,
    data: true,
  };
}

    @Delete(':id')
    async deleteBookById(@Param('id') id: string) {
        return this.bookService.DelDocbyId(id)
    }

    @Delete('softDelete/:id')
    async softDeleteBookById(@Param('id') id: string) {
        return this.bookService.softDelDocbyId(id)
    }

    @Put('uploads')
    @UseInterceptors(FileInterceptor('image', {
        //     storage : diskStorage({
        //   destination: './uploads',
        //   filename: (req, file, cb) => {
        //     const name = file.originalname.split('.')[0];
        //     const fileExtension = file.originalname.split('.')[1];
        //     const newFileName = name.split(' ').join('_')+'_'+Date.now()+'.'+fileExtension;
        //     return cb(null, newFileName);
        //   }
        // }),
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const newFileName = `${Date.now()}-${file.originalname}`;
                return cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is not an image')
        } else {
            const response = {
                filepath: `http://localhost:3000/bookController/uploads/${file.filename}`
            }
            return response
        }
    }

    //     @Get('uploads/:filename')
    //     async getPicture(@Param('filename') filename, @Res() res:Response) {
    //         res.sendFile(filename, {root:'./uploads'})
    //     }

    @Get('uploads/:fileName')
    async getPicture(@Param('fileName') fileName: string, @Res() res: Response) {
        const path = join(process.cwd(), 'uploads', fileName);
        res.sendFile(path);
    }
}
