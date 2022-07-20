import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { FederativeUnitsEnum } from 'src/shared/enums/FederativeUnits.enum';

export class CreatePatientAddressDto {
  country?: string;

  @IsString({
    message: 'State must be a string',
  })
  @IsEnum(FederativeUnitsEnum, {
    message: `State must have type ${FederativeUnitsEnum}`,
  })
  @IsNotEmpty({
    message: 'State must be provided',
  })
  state: string;

  @IsString({
    message: 'District must be a string',
  })
  @IsNotEmpty({
    message: 'District must be provided',
  })
  district: string;

  @IsString({
    message: 'State must be a string',
  })
  @IsNotEmpty({
    message: 'City m,ust be provided',
  })
  city: string;

  @IsString({
    message: 'Street must be a string',
  })
  @IsNotEmpty({
    message: 'Street must be provided',
  })
  street: string;

  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      message: 'Number must be a integer number',
    },
  )
  @IsNotEmpty({
    message: 'Number must be provided',
  })
  @Min(1, {
    message: 'Number must be between 1 and 10000',
  })
  @Max(10000, {
    message: 'Number must be between 1 and 10000',
  })
  number: number;

  @IsString({
    message: 'zipcode must be a string',
  })
  @IsNotEmpty({
    message: 'zipcode must be provided',
  })
  @MinLength(4, {
    message: 'zipcode is too short',
  })
  @MaxLength(8, {
    message: 'zipcode is too long',
  })
  zipcode: string;
}
