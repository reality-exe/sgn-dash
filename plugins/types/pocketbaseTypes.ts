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
  id: string;
  gate_address: string;
  gate_code: string;
  session_name: string;
  owner_name: string;
  active_users: number;
  max_users: number;
  public_gate: boolean;
  is_headless: boolean;
  iris_state: boolean;
  gate_status: "IDLE" | "INCOMING7" | "INCOMING8" | "INCOMING9" | "OPEN";
}

export interface TPB extends PocketBase {
  collection(idOrName: string): RecordService;
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "stargates"): RecordService<Stargate>;
}
