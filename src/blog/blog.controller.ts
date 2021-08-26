import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("/api/v1")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get("blogs")
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Post("blog")
  createBlog() {
    return this.blogService.createBlog();
  }

  @Get("blog/:id")
  getBlog(@Param("id") id: number) {
    return this.blogService.getBlog(id);
  }

  @Patch("blog/:id")
  updateBlog(@Param("id") id: number) {
    return this.blogService.updateBlog(id);
  }

  @Delete("blog/:id")
  deleteBlog(@Param("id") id: number) {
    return this.blogService.deleteBlog(id);
  }
}
