import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Oauth2ClientRepository } from "./oauth2-client.repository";
import { Oauth2CodeRepository } from "./oauth2-code.repository";

interface ICreationAttributes {
  state: string;
}

@Table({ timestamps: true, paranoid: true, tableName: "oauth2-state" })
export class Oauth2StateRepository extends Model<Oauth2StateRepository, ICreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  state: string;

  @ForeignKey(() => Oauth2CodeRepository)
  code: Oauth2CodeRepository;

  @ForeignKey(() => Oauth2ClientRepository)
  client: Oauth2ClientRepository;
}
