import axios from 'axios';
import { getCookie, removeCookies, setCookie } from 'cookies-next';

import { LoginDTO } from '@/interface/dto/login.dto';
import { RegisterDTO } from '@/interface/dto/register.dto';
import { LoginResponseInterface } from '@/interface/login-response.interface';
import RegisterResponseInterface from '@/interface/register-response.interface';
import { UserResponseInterface } from '@/interface/user/user.interface';

import { MyGroupInterface } from '@/interface/group/my-group.response.interface';
import { MessageInterface } from '@/interface/message/message.interface';
import { BASE_URL_API, KEY_COOKIES_LOGIN, KEY_COOKIES_USER } from './constant';

const bearerHeader = () => {
  const token = getCookie(KEY_COOKIES_LOGIN);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
class API {
  static async register(value: RegisterDTO) {
    const { data } = await axios.post(`${BASE_URL_API}/user`, value);
    const result: RegisterResponseInterface = data;
    return result;
  }

  static async login(value: LoginDTO) {
    const { data } = await axios.post(`${BASE_URL_API}/login`, value);
    const result: LoginResponseInterface = data;

    const { data: user } = await API.me(result.data.id);

    setCookie(KEY_COOKIES_USER, JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    setCookie(KEY_COOKIES_LOGIN, result.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return result;
  }

  static async me(id: string) {
    const { data } = await axios.get(`${BASE_URL_API}/user/${id}`);
    const result: UserResponseInterface = data;
    return result;
  }

  static logout() {
    removeCookies(KEY_COOKIES_USER, {
      path: '/',
      maxAge: 0,
    });

    removeCookies(KEY_COOKIES_LOGIN, {
      path: '/',
      maxAge: 0,
    });
  }

  // Group

  static async getMyGroup() {
    const { data } = await axios.get(`${BASE_URL_API}/group/me`, {
      ...bearerHeader(),
    });
    const result: MyGroupInterface = data;
    return result;
  }

  // Message

  static async getMessageByGroupId(groupId: string) {
    const { data } = await axios.get(`${BASE_URL_API}/message/group/${groupId}`, {
      ...bearerHeader(),
    });

    const result: MessageInterface = data;
    return result;
  }
}

export default API;
