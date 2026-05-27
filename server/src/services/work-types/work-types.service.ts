import { Injectable } from '@nestjs/common';
import { WorkTypes } from '../../models/WorkTypes';
import IWorkTypes from '../../interfacec/IWorkTypes';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkTypesDto } from '../../dto/work-types-dto/create-work-types-dto';

@Injectable()
export class WorkTypesService {

  constructor(
    @InjectModel(WorkTypes)
    private workTypesModel: typeof WorkTypes,
  ) {}

  async findAll(): Promise<IWorkTypes[]> {
    return this.workTypesModel.findAll();
  }
  async create(data: CreateWorkTypesDto):Promise<WorkTypes>{
    return this.workTypesModel.create(data);
  }
}
