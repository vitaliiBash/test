import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Response } from 'express';

import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = exception.message.replace(/\n/g, '');

    let status: HttpStatus;

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found'
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
    })
  }
}
