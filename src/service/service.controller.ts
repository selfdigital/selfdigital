import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ServiceDto } from "./service.dto";

@Controller("/api/v1")
export class ServiceController {
  constructor(private servicesService: ServiceService) {}

  @Get("service")
  getServices() {
    return this.servicesService.getServices();
  }

  @Get("service/:id")
  getService(@Param() id: number) {
    return this.servicesService.getService(id);
  }

  @Post("service")
  createService(@Body() service: ServiceDto) {
    return this.servicesService.createService(service);
  }

  @Patch("service/:id")
  updateService(@Param() id: number, @Body() service: ServiceDto) {
    return this.servicesService.updateService(id, service);
  }

  @Delete("service/:id")
  deleteService(@Param() id: number) {
    return this.servicesService.deleteService(id);
  }
}
