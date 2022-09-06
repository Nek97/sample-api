import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { IValidItemStructure } from '../dto/item.type';

@Controller('valid')
export class ItemValidController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items')
  getItemList(): Promise<IValidItemStructure[]> {
    return this.itemService.getValidItemList();
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<IValidItemStructure> {
    return this.itemService.getValidItem(id);
  }
}
