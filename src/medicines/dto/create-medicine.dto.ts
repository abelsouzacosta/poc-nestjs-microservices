import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMedicineDto {
  @IsString({
    message: 'Name should be a string',
  })
  @IsNotEmpty({
    message: 'Name must be provided',
  })
  name: string;

  @IsArray({
    message: 'other_names should be a array',
  })
  @Type(() => String)
  @ArrayMinSize(1, {
    message: 'other_names should be at least one member',
  })
  @ArrayMaxSize(10, {
    message: 'other_names should have maximum of 10 members',
  })
  other_names: string[];

  @IsString({
    message: 'dosage should be a string',
  })
  @IsNotEmpty({
    message: 'dosage should be provided',
  })
  dosage: string;

  @IsString({
    message: 'active_ingredient should be a string',
  })
  @IsNotEmpty({
    message: 'active_ingredient should be provided',
  })
  active_ingredient: string;

  @IsString({
    message: 'brand should be a string',
  })
  @IsNotEmpty({
    message: 'brand should be provided',
  })
  brand: string;

  @IsString({
    message: 'manufacturer should be a string',
  })
  @IsNotEmpty({
    message: 'manufacturer should be provided',
  })
  manufacturer: string;

  @IsString({
    message: 'product_code should be a string',
  })
  @IsNotEmpty({
    message: 'productr_code should be provided',
  })
  product_code: string;
}
