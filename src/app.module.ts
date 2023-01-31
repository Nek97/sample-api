import { CacheModule, Module } from '@nestjs/common';
import { Day1Module } from './adventOfCode/day_1/day_1.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), ItemModule, Day1Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
