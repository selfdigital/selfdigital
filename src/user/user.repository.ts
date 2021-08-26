import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Oauth2ClientRepository } from "../oauth2/repositories/oauth2-client.repository";
import { Oauth2TokenRepository } from "../oauth2/repositories/oauth2-token.repository";
import { Oauth2CodeRepository } from "../oauth2/repositories/oauth2-code.repository";

interface ICreationAttributes {
  email: string;
  name: string;
  password: string;
}

@Table({ tableName: "user", paranoid: true })
export class UserRepository extends Model<UserRepository, ICreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Oauth2ClientRepository, "user")
  client: Oauth2ClientRepository;

  @HasMany(() => Oauth2TokenRepository, "user")
  token: Oauth2TokenRepository;

  @HasMany(() => Oauth2CodeRepository, "user")
  code: Oauth2CodeRepository;
}
