import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientNotFoundException extends HttpException {
  constructor(id: any) {
    super(`Patient ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
