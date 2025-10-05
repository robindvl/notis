import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './@generated';
import { SpacesService } from './modules/space/space.service';
import { BlocksService } from './modules/block/block.service';

@Module({
  imports: [
    ApiModule.forRoot({
      spacesApi: SpacesService,
      blocksApi: BlocksService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
