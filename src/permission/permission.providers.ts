import { PermissionRepository } from "./permission.repository";

export const permissionProviders = [
  {
    provide: "PERMISSION_REPOSITORY",
    useValue: PermissionRepository
  }
];
