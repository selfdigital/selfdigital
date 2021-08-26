import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { Express, Response as EResponse } from "express";
import { UploadService } from "./upload.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("/api/v1/upload")
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Get("/file/:id(\\w{16})")
  getFile(@Param("id") id: string, @Response() response: EResponse) {
    return this.uploadService.getFile(id, response);
  }

  @Get("/file/base64/:id(\\w{16})")
  getB64File(@Param("id") id: string) {
    return this.uploadService.getB64File(id);
  }

  @Post("/file")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.uploadService.uploadFile(file);
  }

  @Post("/files")
  @UseInterceptors(FilesInterceptor("files"))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<string[]> {
    return this.uploadService.uploadFiles(files);
  }

  @Delete("/file/:id(\\w{16})")
  deleteFile(@Param("id") id: string): Promise<void> {
    return this.uploadService.deleteFile(id);
  }
}
