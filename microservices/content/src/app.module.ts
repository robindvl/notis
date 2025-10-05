import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api.module';
import { SpacesService } from './modules/space/space.service';
import { BlocksService } from './modules/block/block.service';
import { BlocksModule } from './modules/block/block.module';

@Module({
  imports: [
    ApiModule.forRoot(
      {
        spacesApi: SpacesService,
        blocksApi: BlocksService,
      },
      { modules: [BlocksModule] },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
