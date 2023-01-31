import { CacheModule, Module } from '@nestjs/common';
import { AdventOfCodeModule } from './adventOfCode/adventOfCode.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ItemModule,
    AdventOfCodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
