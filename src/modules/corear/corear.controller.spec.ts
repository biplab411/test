import { Test, TestingModule } from '@nestjs/testing';
import { CorearController } from './corear.controller';

describe('CorearController', () => {
  let controller: CorearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorearController],
    }).compile();

    controller = module.get<CorearController>(CorearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
