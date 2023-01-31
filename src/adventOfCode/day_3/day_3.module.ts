import { Module } from '@nestjs/common';
import { Day3Controller } from './day_3.controller';
import { Day3Service } from './day_3.service';

@Module({
  imports: [],
  controllers: [Day3Controller],
  providers: [Day3Service],
})
export class Day3Module {}
