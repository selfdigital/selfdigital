import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "portfolio", paranoid: true })
export class PortfolioRepository extends Model<PortfolioRepository> {
  @Column({
    type: DataType.STRING,
    get() {
      return this.getDataValue("cover").split(";");
    },
    set(value: string[]) {
      this.setDataValue("cover", value.join(";"));
    }
  })
  cover: string;

  @Column
  name: string;

  @Column
  miniDescription: string;

  @Column({ type: DataType.TEXT })
  description: string;
}
