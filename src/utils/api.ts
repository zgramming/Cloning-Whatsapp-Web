import axios from 'axios';
import { getCookie, removeCookies, setCookie } from 'cookies-next';

import { LoginDTO } from '@/interface/auth/dto/login.dto';
import { RegisterDTO } from '@/interface/auth/dto/register.dto';
import { ContactCreateResponseInterface } from '@/interface/contact/contact.create-response.interface';
import { ContactMeInterface } from '@/interface/contact/contact.me.interface';
import { ContactCreateDTO } from '@/interface/contact/dto/contact.create.dto';
// eslint-disable-next-line max-len
import { ConversationGroupCreateResponseInterface } from '@/interface/group/conversation.create-group-response.interface';
// eslint-disable-next-line max-len
import { ConversationPrivateCreateResponseInterface } from '@/interface/group/conversation.create-private-response.interface';
import { ConversationDetailInterface } from '@/interface/group/conversation.detail.interface';
import { MyConversationInterface } from '@/interface/group/conversation.me.interface';
import { LoginResponseInterface } from '@/interface/login-response.interface';
import { MessageCreateDTO } from '@/interface/message/dto/message.create.dto';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
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

    setCookie(KEY_COOKIES_LOGIN, result.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    const { data: user } = await API.me();

    setCookie(KEY_COOKIES_USER, JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return result;
  }

  static async me() {
    const { data } = await axios.get(`${BASE_URL_API}/user/me`, {
      ...bearerHeader(),
    });
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

  // Conversation

  static async getConversationDetail(id: string) {
    const { data } = await axios.get(`${BASE_URL_API}/conversation/${id}`, {
      ...bearerHeader(),
    });
    const result: ConversationDetailInterface = data;
    return result;
  }

  static async getMyConversation() {
    const { data } = await axios.get(`${BASE_URL_API}/conversation/me`, {
      ...bearerHeader(),
    });
    const result: MyConversationInterface = data;
    return result;
  }

  static async createPrivateConversation(userId: string) {
    const { data } = await axios.post(
      `${BASE_URL_API}/conversation/private`,
      { userId },
      {
        ...bearerHeader(),
      },
    );
    const result: ConversationPrivateCreateResponseInterface = data;
    return result;
  }

  static async createGroupConversation(formData: FormData) {
    const { data } = await axios.post(`${BASE_URL_API}/conversation/group`, formData, {
      ...bearerHeader(),
    });
    const result: ConversationGroupCreateResponseInterface = data;
    return result;
  }

  // Message

  static async sendMessage({ from, conversation_id, message, type }: MessageCreateDTO) {
    const { data } = await axios.post(
      `${BASE_URL_API}/message`,
      {
        from,
        conversation_id,
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

  static async addContact({ conversationId, userId }: ContactCreateDTO) {
    const { data } = await axios.post(
      `${BASE_URL_API}/contact`,
      {
        conversation_id: conversationId,
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
