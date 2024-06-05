export interface User {
  id: string;
  discord_id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: Date;
  updated: Date;
  avatar: string;
  tags: string[];
}
