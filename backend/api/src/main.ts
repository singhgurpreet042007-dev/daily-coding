import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allow frontend (vite) to call backend
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ✅ THIS is missing in your project
  app.setGlobalPrefix("api");

  await app.listen(4000);
  console.log("✅ Backend running on http://localhost:4000");
}
bootstrap();