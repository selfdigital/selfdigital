import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { Oauth2Guard } from "../oauth2/oauth2.guard";
import { Request } from "express";

@Controller("/api/v1")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("users")
  @UseGuards(Oauth2Guard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get("user/me")
  @UseGuards(Oauth2Guard)
  getMe(@Req() request: Request) {
    return this.userService.getMe(request);
  }

  @Post("user")
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }
}
