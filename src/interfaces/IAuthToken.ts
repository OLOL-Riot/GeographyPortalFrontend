import type { Role } from "@/enums/Role";

export default interface IAuthToken {
  refreshToken: string;
  token: string;
  login: string;
  role: Role;
}
