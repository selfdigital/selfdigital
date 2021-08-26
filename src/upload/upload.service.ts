import { HttpException, Inject, Injectable } from "@nestjs/common";
import { readFile, unlink, writeFile } from "fs/promises";
import { extname, resolve } from "path";
import { staticRootPath } from "../config";
import { createHash } from "crypto";
import { IUpload, UploadRepository } from "./upload.repository";
import { Response } from "express";
import { createReadStream } from "fs";

@Injectable()
export class UploadService {
  constructor(@Inject("UPLOAD_REPOSITORY") private uploadRepository: typeof UploadRepository) {}

  private async getMedia(id: string): Promise<[UploadRepository, IUpload]> {
    const media = await this.uploadRepository.findByPk(id);
    if (!media) {
      throw new HttpException("File not found", 404);
    }
    const file = media.get({ plain: true });

    return [media, file];
  }

  async getFile(id: string, response: Response) {
    const [, file] = await this.getMedia(id);
    const fileStream = createReadStream(resolve(staticRootPath, "media", file.filename));
    fileStream.pipe(response);
  }

  async getB64File(id: string) {
    const [, file] = await this.getMedia(id);
    const b64string = await readFile(resolve(staticRootPath, "media", file.filename), {
      encoding: "base64"
    });
    return `data:${file.mediaType};base64,${b64string}`;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const generatedDate = Date.now();
    const idData = `${file.buffer.toString("base64")}@generatedAt=${generatedDate}`;
    const hash = createHash("sha256").update(idData).digest("hex");
    const id = hash.slice(0, 16);

    await this.uploadRepository.create({
      id,
      hash,
      filename: `${id}${extname(file.originalname)}`,
      mediaType: file.mimetype || "unknown"
    });

    await writeFile(
      resolve(staticRootPath, "media", `${id}${extname(file.originalname)}`),
      file.buffer
    );

    return id;
  }

  // Response edit with front. How to him be easy
  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const ids: string[] = [];

    for (const file of files) {
      const id = await this.uploadFile(file);
      ids.push(id);
    }

    return ids;
  }

  async deleteFile(id: string): Promise<void> {
    const [media, file] = await this.getMedia(id);
    await unlink(resolve(staticRootPath, "media", file.filename));
    await media.destroy();
  }
}
