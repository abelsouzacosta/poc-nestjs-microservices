import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from './CreatePhoneNumber.dto';

export class CreatePhoneNumberController {
  @IsArray({
    message: 'Phones should be an array',
  })
  @ArrayMinSize(1, {
    message: 'Phones must be at least one instance of phone',
  })
  @ValidateNested({
    each: true,
    message: 'some phone in the request are out of pattern',
  })
  phones: [CreatePhoneNumberDto];
}
