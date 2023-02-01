import { Controller, Get } from '@nestjs/common';
import { Day5Service } from './day_5.service';

@Controller('Day5')
export class Day5Controller {
  constructor(private readonly Day5Service: Day5Service) {}

  @Get('star1')
  getDay5Star1(): string {
    return this.Day5Service.getTopCrateList();
  }

  @Get('star2')
  getDay5Star2(): string {
    return this.Day5Service.getTopCrateList9001();
  }
}
