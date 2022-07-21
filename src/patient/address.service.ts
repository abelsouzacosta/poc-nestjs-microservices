import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AddressService {
  async getAddressZipcode(zipcode: string) {
    const { data } = await axios({
      method: 'get',
      url: `${process.env.ADDRESS_API_URL}/${zipcode}/json`,
    });

    return {
      city: data.localidade,
      state: data.uf,
      district: data.bairro,
      street: data.logradouro,
    };
  }
}
