import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { BlocksApi } from './api';
import { BlocksApiController } from './controllers';
import { SpacesApi } from './api';
import { SpacesApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: BlocksApi,
          useClass: apiImplementations.blocksApi
        },
        {
          provide: SpacesApi,
          useClass: apiImplementations.spacesApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          BlocksApiController,
          SpacesApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}