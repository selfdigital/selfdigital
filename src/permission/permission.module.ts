import { Module } from "@nestjs/common";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { permissionProviders } from "./permission.providers";

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, ...permissionProviders]
})
export class PermissionModule {}
