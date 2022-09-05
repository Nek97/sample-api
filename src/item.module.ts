import { Module } from '@nestjs/common';
import { AppController } from './item.controller';
import { AppService } from './item.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
