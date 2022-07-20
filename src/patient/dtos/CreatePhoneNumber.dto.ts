import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { PhoneTypeEnum } from 'src/shared/enums/PhoneType.enum';

export class CreatePhoneNumberDto {
  @IsString({ message: 'Phone Type Must be a String' })
  @IsEnum(PhoneTypeEnum, {
    message: `Phone type must be of the type ${PhoneTypeEnum}`,
  })
  type: string;

  @IsString({
    message: 'Phone number must be a string',
  })
  @MinLength(10, {
    message: 'Phone number must have at least 10 characters',
  })
  @MaxLength(14, {
    message: 'Phone number must have maximum 14 characters',
  })
  number: string;
}
