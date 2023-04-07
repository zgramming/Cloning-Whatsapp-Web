import axios from 'axios';
import { getCookie, removeCookies, setCookie } from 'cookies-next';

import { LoginDTO } from '@/interface/auth/dto/login.dto';
import { RegisterDTO } from '@/interface/auth/dto/register.dto';
import { ContactCreateResponseInterface } from '@/interface/contact/contact.create-response.interface';
import { ContactMeInterface } from '@/interface/contact/contact.me.interface';
import { ContactCreateDTO } from '@/interface/contact/dto/contact.create.dto';
import { GroupPrivateCreateResponseInterface } from '@/interface/group/group-private-create-response.interface';
import { GroupDetailInterface } from '@/interface/group/group.detail.interface';
import { MyGroupInterface } from '@/interface/group/group.me.interface';
import { LoginResponseInterface } from '@/interface/login-response.interface';
import { MessageCreateDTO } from '@/interface/message/dto/message.create.dto';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import { MessageInterface } from '@/interface/message/message.interface';
import { RegisterResponseInterface } from '@/interface/register-response.interface';
import { UserUpdateProfileDTO } from '@/interface/user/dto/user.update-profile.dto';
import { UserSearchByPhoneInterface } from '@/interface/user/user-search-by-phone.interface';
import { UserResponseInterface } from '@/interface/user/user.interface';
import { UserUpdateProfileResponseInterface } from '@/interface/user/user.update-profile-response';

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

  // User

  static async getUserByPhone(phone: string) {
    const { data } = await axios.get(`${BASE_URL_API}/user/phone/${phone}`, {
      ...bearerHeader(),
    });
    const result: UserSearchByPhoneInterface = data;
    return result;
  }

  static async updateProfile({ name, bio }: UserUpdateProfileDTO) {
    const { data } = await axios.put(
      `${BASE_URL_API}/user`,
      {
        name,
        bio,
      },
      {
        ...bearerHeader(),
      },
    );

    const result: UserUpdateProfileResponseInterface = data;

    setCookie(KEY_COOKIES_USER, JSON.stringify(result.data), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return result;
  }

  static async updateProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await axios.put(`${BASE_URL_API}/user/picture`, formData, {
      ...bearerHeader(),
    });

    const result: UserUpdateProfileResponseInterface = data;

    setCookie(KEY_COOKIES_USER, JSON.stringify(result.data), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return result;
  }

  // Group

  static async getGroupDetail(id: string) {
    const { data } = await axios.get(`${BASE_URL_API}/group/${id}`, {
      ...bearerHeader(),
    });
    const result: GroupDetailInterface = data;
    return result;
  }

  static async getMyGroup() {
    const { data } = await axios.get(`${BASE_URL_API}/group/me`, {
      ...bearerHeader(),
    });
    const result: MyGroupInterface = data;
    return result;
  }

  static async createPrivateGroup(userId: string) {
    const { data } = await axios.post(
      `${BASE_URL_API}/group/private`,
      { userId },
      {
        ...bearerHeader(),
      },
    );
    const result: GroupPrivateCreateResponseInterface = data;
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

  static async sendMessage({ from, group_id, message, type }: MessageCreateDTO) {
    const { data } = await axios.post(
      `${BASE_URL_API}/message`,
      {
        from,
        group_id,
        message,
        type,
      },
      {
        ...bearerHeader(),
      },
    );
    const result: MessageCreateResponseInterface = data;
    return result;
  }

  // Contact

  static async getMyContact() {
    const { data } = await axios.get(`${BASE_URL_API}/contact/me`, {
      ...bearerHeader(),
    });
    const result: ContactMeInterface = data;
    return result;
  }

  static async addContact({ groupId, userId }: ContactCreateDTO) {
    const { data } = await axios.post(
      `${BASE_URL_API}/contact`,
      {
        group_id: groupId,
        user_id: userId,
      },
      {
        ...bearerHeader(),
      },
    );
    const result: ContactCreateResponseInterface = data;
    return result;
  }
}

export default API;
