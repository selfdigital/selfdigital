import { BlogRepository } from "./blog.repository";

export const blogProviders = [
  {
    provide: "BLOG_REPOSITORY",
    useValue: BlogRepository
  }
];
