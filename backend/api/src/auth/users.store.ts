import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

export type UserEntity = {
  id: string;
  email: string;
  password: string;
  name: string;
};

@Injectable()
export class UsersStore {
  private users: UserEntity[] = [];

  create(data: { email: string; password: string; name: string }): UserEntity {
    const u: UserEntity = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      name: data.name,
    };
    this.users.push(u);
    return u;
  }

  findByEmail(email: string): UserEntity | undefined {
    return this.users.find((x) => x.email === email);
  }

  findById(id: string): UserEntity | undefined {
    return this.users.find((x) => x.id === id);
  }
}