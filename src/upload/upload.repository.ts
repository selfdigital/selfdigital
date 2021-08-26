import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationAttributes {
  id: string;
  hash: string;
  filename: string;
  mediaType: string;
}

export { ICreationAttributes as IUpload };

@Table({ tableName: "upload-media", timestamps: false })
export class UploadRepository extends Model<UploadRepository, ICreationAttributes> {
  @Column({ primaryKey: true, type: DataType.STRING })
  declare id: string;

  @Column
  hash: string;

  @Column
  filename: string;

  @Column
  mediaType: string;
}
