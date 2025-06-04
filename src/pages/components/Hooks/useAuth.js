import { useContext } from "react";
import { AuthContext } from "../Avatardropdown/auth-context";

export function useAuth() {
  return useContext(AuthContext);
}
