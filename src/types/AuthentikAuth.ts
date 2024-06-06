import { User as Record } from "./PocketBase/User";

export interface AuthentikAuth {
  meta: Meta;
  record: Record;
  token: string;
}

export interface Meta {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  refreshToken: string;
  expiry: Date;
  rawUser: RawUser;
  isNew: boolean;
}

export interface RawUser {
  email: string;
  email_verified: boolean;
  given_name: string;
  groups: string[];
  name: string;
  nickname: string;
  preferred_username: string;
  sub: string;
}
