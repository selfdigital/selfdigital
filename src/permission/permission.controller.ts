import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionDto } from "./permission.dto";

@Controller("permission")
export class PermissionController {
  constructor(private servicesService: PermissionService) {}

  @Get("service")
  getServices() {
    return this.servicesService.getServices();
  }

  @Post("service")
  createService(@Body() service: PermissionDto) {
    return this.servicesService.createService(service);
  }

  @Get("service/:id")
  getService(@Param() id: number) {
    return this.servicesService.getService(id);
  }

  @Patch("service/:id")
  updateService(@Param() id: number, @Body() service: PermissionDto) {
    return this.servicesService.updateService(id, service);
  }

  @Delete("service/:id")
  deleteService(@Param() id: number) {
    return this.servicesService.deleteService(id);
  }
}
