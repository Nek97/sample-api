import { Controller, Get } from '@nestjs/common';
import { Day6Service } from './day_6.service';

@Controller('Day6')
export class Day6Controller {
  constructor(private readonly Day6Service: Day6Service) {}

  @Get('star1')
  getDay6Star1(): number {
    return this.Day6Service.getStartOfPacketIndex();
  }
}
