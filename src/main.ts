process.env.NODE_ENV === "development" && require("dotenv").config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { name, description } from "../package.json";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { models } from "./database/database.providers";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setBasePath("/api/docs")
    .build();

  const document = SwaggerModule.createDocument(app, options, { extraModels: models });
  const redocOptions: RedocOptions = { theme: "dark" };
  await RedocModule.setup("/api/docs", app, document, redocOptions);

  await app.listen(3200);
}
bootstrap();
