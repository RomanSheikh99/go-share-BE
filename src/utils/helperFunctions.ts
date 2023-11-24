import { ConflictException, HttpStatus } from '@nestjs/common';

export function getStatusCode(error: any) {
  const statusCode =
    error instanceof ConflictException
      ? HttpStatus.CONFLICT
      : HttpStatus.INTERNAL_SERVER_ERROR;

  return statusCode;
}
