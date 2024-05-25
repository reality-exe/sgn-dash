export interface ResoniteUser {
    id:                 string;
    username:           string;
    normalizedUsername: string;
    registrationDate:   Date;
    isVerified:         boolean;
    isLocked:           boolean;
    supressBanEvasion:  boolean;
    "2fa_login":        boolean;
    tags:               string[];
    profile:            Profile;
}
export interface Profile {
    iconUrl:       string;
    displayBadges: any[];
}
