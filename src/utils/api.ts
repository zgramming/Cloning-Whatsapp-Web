import { LoginDTO } from '@/interface/dto/login.dto';
import { RegisterDTO } from '@/interface/dto/register.dto';
import { LoginResponseInterface } from '@/interface/login-response.interface';
import RegisterResponseInterface from '@/interface/register-response.interface';
import axios from 'axios';
import { BASE_URL_API } from './constant';

class API {
  static async register(value: RegisterDTO) {
    const { data } = await axios.post(`${BASE_URL_API}/user`, value);
    const result: RegisterResponseInterface = data;
    return result;
  }

  static async login(value: LoginDTO) {
    const { data } = await axios.post(`${BASE_URL_API}/login`, value);
    const result: LoginResponseInterface = data;
    return result;
  }
}

export default API;
