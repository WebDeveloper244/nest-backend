import { Test, TestingModule } from '@nestjs/testing';
import { BookControllerController } from './book-controller.controller';

describe('BookControllerController', () => {
  let controller: BookControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookControllerController],
    }).compile();

    controller = module.get<BookControllerController>(BookControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
