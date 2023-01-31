import { Controller, Get } from '@nestjs/common';

import { Day2Service } from './day_2.service';

@Controller('day2')
export class Day2Controller {
  constructor(private readonly day2Service: Day2Service) {}

  @Get('star1')
  getDay2Star1(): number {
    return this.day2Service.getScore();
  }

  @Get('star2')
  getDay2Star2(): number {
    return this.day2Service.getScoreUsingStrategy();
  }
}
