import { AllowNull, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import IWorks from "../interfacec/IWorks";
import * as sequelize from "sequelize";
import { WorkTypes } from "./WorkTypes";

export interface ICreateWorks extends sequelize.Optional<IWorks, 'id'> {}

@Table
export default class Works extends Model<IWorks, ICreateWorks>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    @ForeignKey(() => WorkTypes)
    declare workTypesID: number;

    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    declare state: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare description?: string;
    @HasOne(() => WorkTypes, {foreignKey:'id', sourceKey:'workTypesID'})
    declare workType?: sequelize.NonAttribute<WorkTypes>;
    
}