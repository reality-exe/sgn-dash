import PocketBase, { RecordService } from "pocketbase";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  tags: string[];
  discord_id: string;
}

export interface Stargate {
  active_users: number;
  collectionId: string;
  collectionName: string;
  created: Date;
  gate_address: string;
  gate_code: string;
  gate_status: string;
  id: string;
  iris_state: boolean;
  is_headless: boolean;
  max_users: number;
  owner_name: string;
  public_gate: boolean;
  session_name: string;
  session_url: string;
  updated: Date;
}

export interface TPB extends PocketBase {
  collection(idOrName: string): RecordService;
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "stargates"): RecordService<Stargate>;
}
