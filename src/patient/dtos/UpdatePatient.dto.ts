import { IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto {
  @IsString({
    message: 'Height must be a string',
  })
  @IsOptional()
  height?: string;

  @IsString({
    message: 'Weight must be a string',
  })
  @IsOptional()
  weight?: string;
}
