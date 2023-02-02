import { Module } from '@nestjs/common';
import { Day6Controller } from './day_6.controller';
import { Day6Service } from './day_6.service';

@Module({
  imports: [],
  controllers: [Day6Controller],
  providers: [Day6Service],
})
export class Day6Module {}
