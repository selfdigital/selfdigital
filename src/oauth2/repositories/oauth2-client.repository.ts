import { Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Oauth2TokenRepository } from "./oauth2-token.repository";
import { Oauth2CodeRepository } from "./oauth2-code.repository";
import { Oauth2StateRepository } from "./oauth2-state.repository";
import { UserRepository } from "../../user/user.repository";

interface ICreationAttributes {
  id: string;
  appName: string;
  clientId: string;
  clientSecret: string;
  grants?: string | string[];
  redirectUris?: string | string[];
}

@Table({ timestamps: true, paranoid: true, tableName: "oauth2-client" })
export class Oauth2ClientRepository extends Model<Oauth2ClientRepository, ICreationAttributes> {
  @Column({ type: DataType.STRING, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING })
  appName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  clientId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  clientSecret: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    get() {
      const val = this.getDataValue("grants");
      return val?.length ? val.split(";") : "";
    },
    set(val: string | string[]) {
      this.setDataValue("grants", !val ? null : Array.isArray(val) ? val.join(";") : val);
    }
  })
  grants: string | string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
    get() {
      const val = this.getDataValue("redirectUris");
      return val?.length ? val.split(";") : "";
    },
    set(val: string | string[]) {
      this.setDataValue("redirectUris", !val ? null : Array.isArray(val) ? val.join(";") : val);
    }
  })
  redirectUris: string | string[];

  @ForeignKey(() => UserRepository)
  user: UserRepository;

  @HasMany(() => Oauth2TokenRepository, "client")
  token: Oauth2TokenRepository;

  @HasMany(() => Oauth2CodeRepository, "client")
  code: Oauth2CodeRepository;

  @HasOne(() => Oauth2StateRepository, "client")
  state: Oauth2StateRepository;
}
