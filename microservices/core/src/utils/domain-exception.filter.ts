import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainException, EntityNotFoundException } from '@repo/domain';
import { TypeGuardError } from 'typia';

@Catch(DomainException, TypeGuardError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;
    let error = exception.name;

    if (exception instanceof EntityNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof TypeGuardError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation failed at ${exception.path}: expected ${exception.expected}`;
      error = 'ValidationError';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: error,
    });
  }
}