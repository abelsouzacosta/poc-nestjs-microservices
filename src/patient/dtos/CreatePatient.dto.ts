import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BloodTypeEnum } from 'src/shared/enums/BloodType.enum';
import { PatientPhoneNumber } from '../entities/PatientPhoneNumber';

export class CreatePatientDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({
    message: 'Name must be provided',
  })
  name: string;

  @IsString({
    message: `ssn must be a string`,
  })
  @IsNotEmpty({
    message: 'ssn must be provided',
  })
  ssn: string;

  @IsString({
    message: 'Email must be a string',
  })
  @IsNotEmpty({
    message: 'Email must be provided',
  })
  @IsEmail({
    message: 'should be a valid email',
  })
  email: string;

  @IsString({
    message: 'date_birth must be a string',
  })
  @IsNotEmpty({
    message: 'date_birth must be provided',
  })
  date_birth: string;

  @IsString({
    message: 'Height must be a string',
  })
  @IsNotEmpty({
    message: 'Height must be provided',
  })
  height: string;

  @IsString({
    message: 'Weight must be a string',
  })
  @IsNotEmpty({
    message: 'Weight must be provided',
  })
  weight: string;

  @IsString({
    message: 'Blood_type must be a string',
  })
  @IsEnum(BloodTypeEnum, {
    message: `Blood Type should be type BloodTypeEnum`,
  })
  @IsNotEmpty({
    message: 'Blod_type must be provided',
  })
  blood_type: string;

  @IsString({
    message: 'Zipcode must be a string',
  })
  @IsNotEmpty({
    message: 'Zipcode must be provided',
  })
  zipcode: string;

  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      message: 'Number must be a integer',
    },
  )
  @IsNotEmpty({
    message: 'Number must be provided',
  })
  @Max(10000, {
    message: 'Number should be between 1 and 10000',
  })
  @Min(1, {
    message: 'Number should be between 1 and 10000',
  })
  number: number;

  @IsArray({
    message: 'Phones must be a array',
  })
  @ArrayMinSize(1, {
    message: 'Phones should have at least one member',
  })
  phones: PatientPhoneNumber[];
}
