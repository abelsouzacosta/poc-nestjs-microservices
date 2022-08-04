import { HttpException, HttpStatus } from '@nestjs/common';

export class MedicineNotFoundException extends HttpException {
  constructor(id: any) {
    super(`Medicine ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
