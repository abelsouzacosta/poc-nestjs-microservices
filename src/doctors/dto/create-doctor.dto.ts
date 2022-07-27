import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString({
    message: 'Name should be a string',
  })
  @IsNotEmpty({
    message: 'Name should be provided',
  })
  name: string;

  @IsString({
    message: 'Register should be a string',
  })
  @IsNotEmpty({
    message: 'Register should provided',
  })
  register: string;

  @IsString({
    message: 'Speciality should be a string',
  })
  @IsNotEmpty({
    message: 'Speciality should be provided',
  })
  speciality: string;
}
