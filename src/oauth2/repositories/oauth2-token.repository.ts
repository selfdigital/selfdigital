import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Oauth2ClientRepository } from "./oauth2-client.repository";
import { UserRepository } from "../../user/user.repository";

interface ICreationAttributes {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope?: string | string[];
}

@Table({ timestamps: true, paranoid: true, tableName: "oauth2-token" })
export class Oauth2TokenRepository extends Model<Oauth2TokenRepository, ICreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  accessToken: string;

  @Column({ type: DataType.DATE, allowNull: false })
  accessTokenExpiresAt: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  refreshToken: string;

  @Column({ type: DataType.DATE, allowNull: false })
  refreshTokenExpiresAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    get() {
      const val = this.getDataValue("scope");
      return val?.length ? val.split(";") : "";
    },
    set(val: string | string[]) {
      this.setDataValue("scope", !val ? null : Array.isArray(val) ? val.join(";") : val);
    }
  })
  scope: string | string[];

  @ForeignKey(() => Oauth2ClientRepository)
  client: Oauth2ClientRepository;

  @ForeignKey(() => UserRepository)
  user: UserRepository;
}
