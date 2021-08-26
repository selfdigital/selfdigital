import { Inject, Injectable } from "@nestjs/common";
import { ServiceDto } from "./service.dto";
import { ServiceRepository } from "./service.repository";

@Injectable()
export class ServiceService {
  constructor(
    @Inject("SERVICES_REPOSITORY") private servicesRepository: typeof ServiceRepository
  ) {}

  async getServices() {}

  async getService(id: number) {}

  async createService(service: ServiceDto) {}

  async updateService(id: number, service: ServiceDto) {}

  async deleteService(id: number) {}
}
