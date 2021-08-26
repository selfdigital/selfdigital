import { Inject, Injectable } from "@nestjs/common";
import { BlogRepository } from "./blog.repository";

@Injectable()
export class BlogService {
  constructor(@Inject("BLOG_REPOSITORY") private blogRepository: typeof BlogRepository) {}

  getAllBlogs(): Promise<BlogRepository[]> {
    return this.blogRepository.findAll<BlogRepository>();
  }

  async createBlog() {}

  async getBlog(id: number) {}

  async updateBlog(id: number) {}

  async deleteBlog(id: number) {}
}
