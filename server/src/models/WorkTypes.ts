import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';
import IWorkTypes from '../interfacec/IWorkTypes';

@Table
export class WorkTypes extends Model<IWorkTypes> {
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
    })
        workName!: string;

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
        description!: string; 
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

  // Add other fields and relationships
}