import { ServiceRepository } from "./service.repository";

export const serviceProvider = [
  {
    provide: "SERVICES_REPOSITORY",
    useValue: ServiceRepository
  }
];
