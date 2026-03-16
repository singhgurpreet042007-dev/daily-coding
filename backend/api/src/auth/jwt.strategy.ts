import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";

type SafeUser = { id: string; email: string; name: string };

type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: number;
};

@Injectable()
export class AuthService {
  private users: UserRecord[] = [];

  // ✅ REGISTER
  async register(email: string, password: string, name?: string) {
    email = (email || "").trim().toLowerCase();
    name = (name || "Coder").trim();

    if (!email || !password) throw new BadRequestException("Email and password required");

    const existing = this.users.find((u) => u.email === email);
    if (existing) throw new BadRequestException("User already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    const user: UserRecord = {
      id: randomUUID(),
      email,
      name,
      passwordHash,
      createdAt: Date.now(),
    };

    this.users.push(user);

    const safe: SafeUser = { id: user.id, email: user.email, name: user.name };
    return { message: "User registered", user: safe };
  }

  // ✅ LOGIN (returns user for controller to sign JWT)
  async validateUser(email: string, password: string): Promise<UserRecord> {
    email = (email || "").trim().toLowerCase();

    const user = this.users.find((u) => u.email === email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    return user;
  }

  // ✅ IMPORTANT: JwtStrategy calls this
  findById(id: string): SafeUser | null {
    const u = this.users.find((x) => x.id === id);
    if (!u) return null;
    return { id: u.id, email: u.email, name: u.name };
  }

  // optional helper (future)
  findByEmail(email: string): SafeUser | null {
    const e = (email || "").trim().toLowerCase();
    const u = this.users.find((x) => x.email === e);
    if (!u) return null;
    return { id: u.id, email: u.email, name: u.name };
  }
}