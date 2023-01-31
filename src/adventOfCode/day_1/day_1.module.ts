import { Module } from '@nestjs/common';
import { Day1Controller } from './day_1.controller';
import { Day1Service } from './day_1.service';

@Module({
  imports: [],
  controllers: [Day1Controller],
  providers: [Day1Service],
})
export class Day1Module {}
