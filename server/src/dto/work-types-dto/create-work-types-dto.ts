import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import IWorkTypes from '../../interfacec/IWorkTypes';
import { Optional } from '@nestjs/common';
import { IsNull } from 'sequelize-typescript';
export class CreateWorkTypesDto implements Omit<IWorkTypes, 'id'> {
    @IsString()
    workName!: string;
    
    @IsOptional()
    @IsString()
    description?: string;


    toType():IWorkTypes{
        return{
            description:this.description,
            workName:this.workName
        };
    }
}
