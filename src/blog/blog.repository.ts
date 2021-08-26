import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: "blog", paranoid: true })
export class BlogRepository extends Model {}
