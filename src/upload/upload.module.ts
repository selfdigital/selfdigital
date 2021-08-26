import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { DatabaseModule } from "../database/database.module";
import { uploadProvider } from "./upload.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService, ...uploadProvider]
})
export class UploadModule {}
