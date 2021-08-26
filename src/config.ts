import { resolve } from "path";
import { genSaltSync } from "bcryptjs";

export const staticRootPath = resolve(__dirname, "..", "static");
export const bcryptSalt = genSaltSync(16);

export const accessTokenExpireTime = 3600;
export const refreshTokenExpireTime = 3600 * 24 * 14;
export const authorizationCodeExpireTime = 3600;
