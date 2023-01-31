import { Controller, Get } from '@nestjs/common';
import { Day3Service } from './day_3.service';

@Controller('day3')
export class Day3Controller {
  constructor(private readonly day3Service: Day3Service) {}

  @Get('star1')
  getDay3Star1(): number {
    return this.day3Service.ruckstackPrioritiesSum();
  }

  @Get('star2')
  getDay3Star2(): number {
    return this.day3Service.ruckstackBadgePrioritiesSum();
  }
}
