import { Table, Column, Model, DataType, AllowNull, HasOne } from 'sequelize-typescript';
import IWorkTypes from '../interfacec/IWorkTypes';
import * as sequelize from 'sequelize';
import Works from './Works';

export interface ICreateWorkTypes extends sequelize.Optional<IWorkTypes, 'id'> {}

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

}