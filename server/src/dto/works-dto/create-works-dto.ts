import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import IWorks from "../../interfacec/IWorks";

export class CreateWorksDTO implements Omit<IWorks, 'id'>{

    @IsString()
    declare fio: string;

    @IsNumber()
    declare dateOfCompletion: number;

    @IsNumber()
    declare volume: number;

    @IsString()
    @IsIn(["п.м.", "кв.м.", "куб.м.", "шт.", "час.", "литры"])
    declare uoMeasurement: "п.м." | "кв.м." | "куб.м." | "шт." | "час." | "литры";

    @IsNumber()
    declare workTypesID: number;

    @IsNumber()
    @IsIn([0,1,2,3,4])
    declare state: 0 | 1 | 2 | 3;
    
    @IsOptional()
    @IsString()
    description?: string;
}