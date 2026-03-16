import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule, // 🔐 authentication module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}