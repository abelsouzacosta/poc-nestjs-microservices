import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicineDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsOptional()
  name?: string;

  @IsString({
    message: 'dosage should be a string',
  })
  @IsOptional()
  dosage?: string;

  @IsString({
    message: 'active_ingredient should be a string',
  })
  @IsOptional()
  active_ingredient?: string;

  @IsString({
    message: 'brand should be a string',
  })
  @IsOptional()
  brand?: string;

  @IsString({
    message: 'manufacturer should be a string',
  })
  @IsOptional()
  manufacturer?: string;
}
