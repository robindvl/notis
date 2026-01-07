import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './utils/typeorm-exception.filter';
import { DomainExceptionFilter } from './utils/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new TypeOrmExceptionFilter(),
    new DomainExceptionFilter()
  );
  await app.listen(process.env.PORT ?? 5002);
}
void bootstrap();
