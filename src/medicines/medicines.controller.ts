import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ProductCodeAlreadyExistsPipe } from './infra/pipes/product-code-already-exists.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly service: MedicinesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(ProductCodeAlreadyExistsPipe)
    data: CreateMedicineDto,
  ) {
    return this.service.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateMedicineDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.NO_CONTENT)
  import(@UploadedFile() file: Express.Multer.File) {
    return this.service.import(file);
  }
}
