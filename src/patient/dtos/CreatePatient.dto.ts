import { PatientPhoneNumber } from '../entities/PatientPhoneNumber';

export class CreatePatientDto {
  name: string;

  ssn: string;

  email: string;

  date_birth: string;

  height: string;

  weight: string;

  blood_type: string;

  zipcode: string;

  phones: PatientPhoneNumber[];
}
