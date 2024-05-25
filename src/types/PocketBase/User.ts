export interface User {
    id:              string;
    collectionId:    string;
    collectionName:  string;
    username:        string;
    verified:        boolean;
    emailVisibility: boolean;
    email:           string;
    created:         Date;
    updated:         Date;
    avatar:          string;
    tags:            string[];
}
