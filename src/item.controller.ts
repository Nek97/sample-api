import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './item.service';
import { IItemStructure } from './dto/item.type';

@Controller('item')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  getItemList() {
    return this.appService.getItemList();
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<IItemStructure> {
    return this.appService.getItem(id);
  }
}
