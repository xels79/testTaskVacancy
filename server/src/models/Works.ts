import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";
import IWorks from "../interfacec/IWorks";
import { Optional } from "sequelize";

export interface ICreateWorks extends Optional<IWorks, 'id'> {}

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
}