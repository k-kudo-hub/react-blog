import { User } from "../user";

export default interface Me extends User {
  isLoggedIn: boolean;
}
