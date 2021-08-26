import { Client, User } from "oauth2-server";
import { compareSync } from "bcryptjs";
import { randomBytes } from "crypto";
import { Sequelize } from "sequelize-typescript";

export const oauth2Model = (
  sequelize: Sequelize,
  models = {
    OAuth2Code: `OAuth2Code`,
    OAuth2Token: `OAuth2Token`,
    OAuth2Client: `OAuth2Client`,
    OAuth2Scope: `OAuth2Scope`,
    OAuth2State: `OAuth2State`,
    User: `User`
  }
) => {
  const getModel = (model: string) => sequelize.model(model);

  const getClientAndUser = async <T extends { client: Client; user: User }>(obj: T) => {
    const clientModel = getModel(models.OAuth2Client);
    const userModel = getModel(models.User);

    obj.client = (await clientModel.findByPk(obj.client as unknown as number)).get({
      plain: true
    });
    obj.user = (await userModel.findOne(obj.user)).get({ plain: true });
  };

  return {
    async getUser(email, password) {
      const userModel = await getModel(models.User).findOne({ where: { email } });
      if (!userModel) return;
      const user = userModel.get({ plain: true });
      const compared = compareSync(password, user.password);
      return compared ? user : void 0;
    },
    async getClient(clientId, clientSecret) {
      const clientModel = await getModel(models.OAuth2Client).findOne({ where: { clientId } });
      if (!clientModel) return;
      const client = clientModel.get({ plain: true });
      if (clientSecret && client.clientSecret !== clientSecret) return;
      return client;
    },
    async generateAccessToken(client, user, scope) {
      return randomBytes(24).toString("hex");
    },
    async getAccessToken(accessToken) {
      const tokenModel = await getModel(models.OAuth2Token).findOne({
        where: { accessToken },
        include: { all: true }
      });
      if (!tokenModel) return;
      const token = tokenModel.get({ plain: true });
      await getClientAndUser(token);
      return token;
    },
    async generateRefreshToken(client, user) {
      return randomBytes(24).toString("hex");
    },
    async getRefreshToken(refreshToken) {
      const tokenModel = await getModel(models.OAuth2Token).findOne({
        where: { refreshToken },
        include: { all: true }
      });
      if (!tokenModel) return;
      const token = tokenModel.get({ plain: true });
      await getClientAndUser(token);
      return token;
    },
    async saveToken(token, client, user) {
      await getModel(models.OAuth2Token).create({
        ...token,
        client: client.id,
        user: user.id
      });

      token.user = user;
      token.client = client;
      token.scope = Array.isArray(client.grants) ? client.grants.join(" ") : client.grants;
      return token;
    },
    async revokeToken(token) {
      const tokenModel = await getModel(models.OAuth2Token).findOne({
        where: { refreshToken: token.refreshToken }
      });
      if (!tokenModel) return;

      try {
        await tokenModel.destroy();
        return true;
      } catch (e) {
        return false;
      }
    },
    async verifyScope(token, scope) {
      return Array.isArray(scope)
        ? Array.isArray(token.scope)
          ? !!token.scope.find(sc => scope.includes(sc))
          : scope.includes(token.scope)
        : Array.isArray(token.scope)
        ? token.scope.includes(scope)
        : token.scope === scope;
    },
    async generateAuthorizationCode(client, user) {
      return randomBytes(36).toString("hex");
    },
    async getAuthorizationCode(authorizationCode) {
      const codeModel = await getModel(models.OAuth2Code).findOne({ where: { authorizationCode } });
      if (!codeModel) return;
      const code = codeModel.get({ plain: true });
      await getClientAndUser(code);
      code.code = code.authorizationCode;
      return code;
    },
    async saveAuthorizationCode(authCode, client, user) {
      const create = { ...authCode, client: client.id, user: user.id };
      await getModel(models.OAuth2Code).create(create);
      const codeModel = await getModel(models.OAuth2Code).findOne({
        where: { authorizationCode: authCode.authorizationCode },
        include: { all: true }
      });
      const code = codeModel.get({ plain: true });
      code.user = user;
      code.client = client;

      return code;
    },
    async revokeAuthorizationCode(code) {
      const codeModel = await getModel(models.OAuth2Code).findOne({
        where: { authorizationCode: code.authorizationCode }
      });
      if (!codeModel) return;

      try {
        await codeModel.destroy();
        return true;
      } catch (e) {
        return false;
      }
    }
  };
};
