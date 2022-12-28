import { LocalStorage } from "quasar";
import type { Role } from "./enums/Role";
import type IAuthToken from "./interfaces/IAuthToken";

export function getRole(): Role {
  let result: Role = { value: "Unauth" };

  let authToken = LocalStorage.getItem("auth") as IAuthToken | null | undefined;

  if (authToken) result = authToken.role;

  return result;
}

export function isAdministrator(): boolean {
  return getRole().value === "Administrator";
}

export function isAuth(): boolean {
  return getRole().value !== "Unauth";
}
