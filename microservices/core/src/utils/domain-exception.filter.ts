import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { DomainException, EntityNotFoundException } from '@repo/domain';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof EntityNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    }

    // Здесь можно добавить обработку других типов доменных исключений
    // Например, для ошибок валидации бизнес-правил — HttpStatus.BAD_REQUEST

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
    });
  }
}
