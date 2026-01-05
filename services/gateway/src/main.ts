import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { TrpcRouter } from './processors/trpc/trpc.router';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();

// **Express**
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();

//   const trpc = app.get(TrpcRouter);
//   trpc.applyMiddleware(app);

//   await app.listen(process.env.PORT || 5000);
// }
// bootstrap();
