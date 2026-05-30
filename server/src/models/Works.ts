import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  BelongsTo,
  Model,
  Table,
} from 'sequelize-typescript';
import IWorks from '../interfacec/IWorks';
import * as sequelize from 'sequelize';
import { WorkTypes } from './WorkTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateWorks extends sequelize.Optional<IWorks, 'id'> {}

@Table
export default class Works extends Model<IWorks, ICreateWorks> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => WorkTypes)
  declare workTypesID: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare state: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description?: string;
  @BelongsTo(()=>WorkTypes, {
    onDelete: "RESTRICT"
  })
  declare workType?: sequelize.NonAttribute<WorkTypes>;

  @Column({
      type: DataType.INTEGER,
      allowNull: false
  })
  declare dateOfCompletion;

  @Column({
      type: DataType.INTEGER,
      allowNull: false
  })
  declare volume;

  @Column({
      type: DataType.STRING,
      allowNull: false
  })
  declare uoMeasurement;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  declare fio;
}
