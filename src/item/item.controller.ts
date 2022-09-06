import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { IItemStructure } from '../dto/item.type';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items')
  getItemList(): Promise<IItemStructure[]> {
    return this.itemService.getItemList();
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<IItemStructure> {
    return this.itemService.getItem(id);
  }
}
