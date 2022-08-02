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
import { ProductCodeAlreadyExistsPipe } from './pipes/product-code-already-exists.pipe';
import { MedicineNotFoundPipe } from './pipes/medicine-not-found.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(ProductCodeAlreadyExistsPipe)
    data: CreateMedicineDto,
  ) {
    return this.medicinesService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', MedicineNotFoundPipe) id: string) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', MedicineNotFoundPipe) id: string,
    @Body() data: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', MedicineNotFoundPipe) id: string) {
    return this.medicinesService.remove(id);
  }

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.NO_CONTENT)
  import(@UploadedFile() file: Express.Multer.File) {
    return this.medicinesService.import(file);
  }
}
