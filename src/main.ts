import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(3000);
}


bootstrap();



// first create env file and write db here
// install mongoose @nestjs/mongoose @nestjs/config
// import in app.module ConfigModule.foorRoot
// import in app.module MongooseModule ConfigModule.foorRoot
// book schema create
// mongooseModule.forFeature({}) import in book.module.ts
// book service
// create book dto updateb book dto
// book controller