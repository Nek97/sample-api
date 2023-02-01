import { Module } from '@nestjs/common';
import { Day5Controller } from './day_5.controller';
import { Day5Service } from './day_5.service';

@Module({
  imports: [],
  controllers: [Day5Controller],
  providers: [Day5Service],
})
export class Day5Module {}
