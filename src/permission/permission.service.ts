import { Inject, Injectable } from "@nestjs/common";
import { PermissionDto } from "./permission.dto";
import { PermissionRepository } from "./permission.repository";

@Injectable()
export class PermissionService {
  constructor(
    @Inject("PERMISSION_REPOSITORY") private permissionRepository: typeof PermissionRepository
  ) {}

  async getServices() {}

  async createService(service: PermissionDto) {}

  async getService(id: number) {}

  async updateService(id: number, service: PermissionDto) {}

  async deleteService(id: number) {}
}
