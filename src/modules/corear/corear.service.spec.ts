import { Test, TestingModule } from '@nestjs/testing';
import { CorearService } from './corear.service';

describe('CorearService', () => {
  let service: CorearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorearService],
    }).compile();

    service = module.get<CorearService>(CorearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
