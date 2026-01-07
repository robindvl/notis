import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api.module';
import { SpaceService } from './modules/space/space.service';
import { NoteService } from './modules/note/note.service';
import { SpaceModule } from './modules/space/space.module';
import { NoteModule } from './modules/note/note.module';
import { NoteEntity } from './modules/note/entities/note.entity';
import { SpaceEntity } from './modules/space/entities/space.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5433),
        username: configService.get<string>('DB_USERNAME', 'notis'),
        password: configService.get<string>('DB_PASSWORD', 'notis_password'),
        database: configService.get<string>('DB_DATABASE', 'notis_db'),
        entities: [NoteEntity, SpaceEntity],
        synchronize: true, // Only for development!
      }),
      inject: [ConfigService],
    }),
    ApiModule.forRoot(
      {
        spaceApi: SpaceService,
        noteApi: NoteService,
      },
      { modules: [SpaceModule, NoteModule] },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
