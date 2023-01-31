import { Module } from '@nestjs/common';
import { Day1Module } from './day_1/day_1.module';
import { Day2Module } from './day_2/day_2.module';
import { Day3Module } from './day_3/day_3.module';

@Module({
  imports: [Day1Module, Day2Module, Day3Module],
  controllers: [],
  providers: [],
})
export class AdventOfCodeModule {}
