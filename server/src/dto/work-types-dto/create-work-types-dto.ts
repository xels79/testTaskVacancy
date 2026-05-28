import { IsString, IsOptional } from 'class-validator';
import IWorkTypes from '../../interfacec/IWorkTypes';
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
