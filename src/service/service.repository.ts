import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationAttributes {
  name: string;
  miniDescription: string;
  cover: string;
  description: string;
}

@Table({ tableName: "service", paranoid: true })
export class ServiceRepository extends Model<ServiceRepository, ICreationAttributes> {
  @Column
  name: string;

  @Column
  miniDescription: string;

  @Column
  cover: string;

  @Column({ type: DataType.TEXT })
  description: string;
}
