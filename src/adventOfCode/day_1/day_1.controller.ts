import { Controller, Get } from '@nestjs/common';
import { IDay1Star2 } from 'src/dto/adventOfCode/day1.type';
import { Day1Service } from './day_1.service';

@Controller('day1')
export class Day1Controller {
  constructor(private readonly day1Service: Day1Service) {}

  @Get('star1')
  getDay1Star1(): number {
    return this.day1Service.findMaxCalories();
  }

  @Get('star2')
  getDay1Star2(): IDay1Star2 {
    return this.day1Service.findTop3Elves();
  }
}
