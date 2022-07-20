import { PatientAddress } from '../entities/PatientAddress';
import { PatientPhoneNumber } from '../entities/PatientPhoneNumber';

export class CreatePatientRepositoryDto {
  name: string;

  ssn: string;

  email: string;

  date_birth: string;

  height: string;

  weight: string;

  blood_type: string;

  addresses: PatientAddress[];

  phones: PatientPhoneNumber[];
}
