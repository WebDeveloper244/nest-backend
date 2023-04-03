import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookControllerController } from './book-controller/book-controller.controller';
import { BookServiceService } from './book-service/book-service.service';
import { BookSchema } from './bookSchemas/bookSchema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Book', schema:BookSchema}])],
  controllers: [BookControllerController],
  providers: [BookServiceService]
})
export class BookModule {}
