import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserContextService } from './user-context.service';
import { AccessGuard } from './access.guard';
import { UserContextMiddleware } from './user-context.middleware';

@Global()
@Module({
  providers: [
    UserContextService,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
  exports: [UserContextService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserContextMiddleware).forRoutes('*');
  }
}
