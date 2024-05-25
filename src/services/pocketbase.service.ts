import PocketBase, { RecordService } from "pocketbase";
import { User } from "@/types/PocketBase/User";
import { Stargate } from "@/types/PocketBase/Records/Stargate";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "stargates"): RecordService<Stargate>;
}

export const pb = new PocketBase(
  "https://aor-db.rxserver.net"
) as TypedPocketBase;
pb.autoCancellation(false);
