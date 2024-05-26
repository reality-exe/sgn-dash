import { UserRecord as Record } from "./UserRecord";

export interface DiscordAuth {
    meta:   Meta;
    record: Record;
    token:  string;
}

export interface Meta {
    id:           string;
    name:         string;
    username:     string;
    email:        string;
    avatarUrl:    string;
    accessToken:  string;
    refreshToken: string;
    expiry:       Date;
    rawUser:      RawUser;
    isNew:        boolean;
}

export interface RawUser {
    accent_color:           number;
    avatar:                 string;
    avatar_decoration_data: null;
    banner:                 null;
    banner_color:           string;
    clan:                   null;
    discriminator:          string;
    email:                  string;
    flags:                  number;
    global_name:            string;
    id:                     string;
    locale:                 string;
    mfa_enabled:            boolean;
    premium_type:           number;
    public_flags:           number;
    username:               string;
    verified:               boolean;
}
