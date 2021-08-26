import { UserRepository } from "./user.repository";

export const UserProvider = [
  {
    provide: "USER_REPOSITORY",
    useValue: UserRepository
  }
];
