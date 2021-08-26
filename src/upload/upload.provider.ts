import { UploadRepository } from "./upload.repository";

export const uploadProvider = [
  {
    provide: "UPLOAD_REPOSITORY",
    useValue: UploadRepository
  }
];
