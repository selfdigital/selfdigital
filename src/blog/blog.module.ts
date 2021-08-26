import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { blogProviders } from "./blog.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [BlogService, ...blogProviders],
  controllers: [BlogController]
})
export class BlogModule {}
