import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { DomainException, EntityNotFoundException } from '@repo/domain';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    if (exception instanceof EntityNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    }

    // Обработка ответа зависит от того, используется Express или Fastify
    // В apps/api используется Fastify
    if (typeof response.status === 'function') {
      // Express
      response.status(status).json({
        statusCode: status,
        message: message,
        error: exception.name,
      });
    } else {
      // Fastify (через host.switchToHttp().getResponse())
      // NestJS абстрагирует это, но если мы хотим быть уверены:
      const reply = host.switchToHttp().getResponse();
      reply.code(status).send({
        statusCode: status,
        message: message,
        error: exception.name,
      });
    }
  }
}

