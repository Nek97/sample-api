import { Controller, Get } from '@nestjs/common';
import { Day4Service } from './day_4.service';

@Controller('Day4')
export class Day4Controller {
  constructor(private readonly Day4Service: Day4Service) {}

  @Get('star1')
  getDay4Star1(): number {
    return this.Day4Service.countSectionOverlap();
  }

  @Get('star2')
  getDay4Star2(): number {
    return this.Day4Service.countSectionPartialOverlap();
  }
}
