import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { CreatePatientAddressDto } from './dtos/CreatePatientAddress.dto';
import { CreatePhoneNumberController } from './dtos/CreatePhoneNumberController.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
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

  @Patch('/add_address/:id')
  @UsePipes(ValidationPipe)
  addAddress(@Param('id') id: string, @Body() data: CreatePatientAddressDto) {
    return this.service.addAddress(id, data);
  }

  @Patch('/add_phones/:id')
  @UsePipes(ValidationPipe)
  addPhone(@Param('id') id: string, @Body() data: CreatePhoneNumberController) {
    return this.service.addPhone(id, data);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() data: UpdatePatientDto) {
    return this.service.update(id, data);
  }

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    return this.service.import(file);
  }
}
