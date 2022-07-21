import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreatePatientAddressDto {
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
      message: 'Number should be a integer between 1 and 10000',
    },
  )
  @Min(1, {
    message: 'Number should be between 1 and 10000',
  })
  @Max(10000, {
    message: 'NUmber should be between 1 and 10000',
  })
  number: number;
}
