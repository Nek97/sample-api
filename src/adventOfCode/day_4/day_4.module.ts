import { Module } from '@nestjs/common';
import { Day4Controller } from './day_4.controller';
import { Day4Service } from './day_4.service';

@Module({
  imports: [],
  controllers: [Day4Controller],
  providers: [Day4Service],
})
export class Day4Module {}
