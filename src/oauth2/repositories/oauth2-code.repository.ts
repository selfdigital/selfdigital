import { Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Oauth2ClientRepository } from "./oauth2-client.repository";
import { Oauth2StateRepository } from "./oauth2-state.repository";
import { UserRepository } from "../../user/user.repository";

interface ICreationAttributes {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri?: string;
  scope?: string | string[];
}

@Table({ timestamps: true, paranoid: true, tableName: "oauth2-code" })
export class Oauth2CodeRepository extends Model<Oauth2CodeRepository, ICreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  authorizationCode: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expiresAt: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  redirectUri: string;

  @Column({ type: DataType.STRING, allowNull: true })
  scope: string | string[];

  @ForeignKey(() => Oauth2ClientRepository)
  client: Oauth2ClientRepository;

  @ForeignKey(() => UserRepository)
  user: UserRepository;

  @HasOne(() => Oauth2StateRepository, "code")
  state: Oauth2StateRepository;
}
