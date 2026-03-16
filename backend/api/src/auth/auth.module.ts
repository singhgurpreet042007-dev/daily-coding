import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersStore } from "./users.store";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "dev_secret_change_me",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersStore],
})
export class AuthModule {}