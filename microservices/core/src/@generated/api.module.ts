import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { NoteApi } from './api';
import { NoteApiController } from './controllers';
import { SpaceApi } from './api';
import { SpaceApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: NoteApi,
          useClass: apiImplementations.noteApi
        },
        {
          provide: SpaceApi,
          useClass: apiImplementations.spaceApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          NoteApiController,
          SpaceApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}