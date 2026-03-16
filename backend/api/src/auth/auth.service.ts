import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { UsersStore, UserEntity } from "./users.store";

type SafeUser = { id: string; email: string; name: string };

@Injectable()
export class AuthService {
  constructor(private usersStore: UsersStore) {}

  // ✅ REGISTER
  register(email: string, password: string, name = "Coder") {
    const exists = this.usersStore.findByEmail(email);
    if (exists) throw new BadRequestException("User already exists");

    const user = this.usersStore.create({ email, password, name });
    const safe: SafeUser = { id: user.id, email: user.email, name: user.name };

    return { message: "User registered", user: safe };
  }

  // ✅ used by jwt strategy (payload.sub)
  findById(id: string): SafeUser | null {
    const u = this.usersStore.findById(id);
    if (!u) return null;
    return { id: u.id, email: u.email, name: u.name };
  }

  // ✅ helper
  findByEmail(email: string): SafeUser | null {
    const u = this.usersStore.findByEmail(email);
    if (!u) return null;
    return { id: u.id, email: u.email, name: u.name };
  }

  // ✅ IMPORTANT: validateUser exists now
  async validateUser(email: string, password: string): Promise<UserEntity> {
    const u = this.usersStore.findByEmail(email);
    if (!u || u.password !== password) {
      throw new UnauthorizedException("Invalid email or password");
    }
    return u;
  }

  // ✅ LOGIN (controller is calling this.auth.login)
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    return {
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
      access_token: "demo-token", // temporary
    };
  }
}