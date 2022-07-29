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
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ProductCodeAlreadyExistsPipe } from './pipes/product-code-already-exists.pipe';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body(ProductCodeAlreadyExistsPipe)
    data: CreateMedicineDto,
  ) {
    return this.medicinesService.create(data);
  }

  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(+id, updateMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinesService.remove(+id);
  }
}
