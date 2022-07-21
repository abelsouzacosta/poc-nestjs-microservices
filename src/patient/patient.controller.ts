import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() data: CreatePatientDto) {
    return this.service.create(data);
  }
}
