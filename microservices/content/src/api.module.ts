import { Module } from '@nestjs/common';
import type { Provider, DynamicModule, Type } from '@nestjs/common';

import { ApiImplementations } from './@generated/api-implementations';
import * as importedControllers from './@generated/controllers';
import * as importedApis from './@generated/api';
import { convertToLowercaseFirstLetter } from './utils';

type ApiKey = keyof typeof importedApis;
const apiNames = Object.keys(importedApis) as ApiKey[];

const controllerNames = Object.keys(
  importedControllers,
) as (keyof typeof importedControllers)[];
const controllers: Type<any>[] = controllerNames.map(
  (key) => importedControllers[key],
);

interface ApiModuleImports {
  modules?: (Type<any> | DynamicModule)[];
}

@Module({})
export class ApiModule {
  static forRoot(
    apiImplementations: ApiImplementations,
    importsOptions: ApiModuleImports = {},
  ): DynamicModule {
    const providers: Provider[] = apiNames.map((key) => {
      const apiClass = importedApis[key];

      if (typeof apiClass !== 'function') {
        throw new Error(`Invalid API class for ${key}`);
      }

      const implementationKey = convertToLowercaseFirstLetter(
        key,
      ) as keyof ApiImplementations;

      if (!apiImplementations[implementationKey]) {
        throw new Error(`Implementation for ${implementationKey} not found`);
      }

      return {
        provide: apiClass,
        useClass: apiImplementations[implementationKey] as Type<any>,
      };
    });

    return {
      module: ApiModule,
      controllers: [...controllers],
      providers: [...providers],
      exports: [...providers],
      imports: importsOptions.modules || [],
    };
  }
}
