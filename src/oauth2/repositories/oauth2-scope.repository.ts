import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationAttributes {
  name: string;
  description: string;
}

@Table({ timestamps: true, paranoid: true, tableName: "oauth2-scope" })
export class Oauth2ScopeRepository extends Model<Oauth2ScopeRepository, ICreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;
}
