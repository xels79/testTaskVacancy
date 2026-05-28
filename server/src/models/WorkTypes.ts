import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';
import IWorkTypes from '../interfacec/IWorkTypes';
import { Optional } from 'sequelize';

export interface ICreateWorkTypes extends Optional<IWorkTypes, 'id'> {}

@Table
export class WorkTypes extends Model<IWorkTypes, ICreateWorkTypes> {
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
    })
       declare workName: string;

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
       declare description: string; 
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
        declare id: number;

  // Add other fields and relationships
}