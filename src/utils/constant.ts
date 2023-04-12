export const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
export const BASE_URL_USER_PROFILE_IMAGE_API = `${BASE_URL_API}/upload/avatar`;
export const BASE_URL_GROUP_PROFILE_IMAGE_API = `${BASE_URL_API}/upload/group/profile`;

export const KEY_COOKIES_LOGIN = process.env.NEXT_PUBLIC_KEY_COOKIES_LOGIN || 'token';
export const KEY_COOKIES_USER = process.env.NEXT_PUBLIC_KEY_COOKIES_USER || 'user';
export const KEY_COOKIES_CHAT_WALLPAPPER = 'chat_wallpaper';
export const KEY_COOKIES_THEME = 'theme';

export const PATH_DEFAULT_ASSET_IMAGE = '/images/default-image.png';
export const PATH_AVATAR_DEVELOPER = '/images/developer-profile.jpeg';

// Socket IO Emmit Event
export const EMIT_EVENT_CONNECT = 'connected';
export const EMIT_EVENT_DISCONNECT = 'disconnect';
export const EMIT_EVENT_CUSTOM_DISCONNECT = 'custom_disconnected';
export const EMIT_EVENT_TYPING = 'typing';
export const EMIT_EVENT_SEND_MESSAGE = 'send_message';
export const EMIT_EVENT_INVITE_NEW_CONVERSATION = 'invite_new_conversation';

// Path: src\utils\constant.ts
