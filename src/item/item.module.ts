import { CacheModule, Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { HttpModule } from '@nestjs/axios';
import { ItemValidController } from './item-valid.controller';

@Module({
  imports: [HttpModule, CacheModule.register({ isGlobal: true })],
  controllers: [ItemController, ItemValidController],
  providers: [ItemService],
})
export class ItemModule {}
