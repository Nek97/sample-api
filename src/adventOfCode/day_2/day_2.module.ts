import { Module } from '@nestjs/common';
import { Day2Controller } from './day_2.controller';
import { Day2Service } from './day_2.service';

@Module({
  imports: [],
  controllers: [Day2Controller],
  providers: [Day2Service],
})
export class Day2Module {}
