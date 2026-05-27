import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkTypesService } from '../../services/work-types/work-types.service';
import IWorkTypes from '../../interfacec/IWorkTypes';
import { CreateWorkTypesDto } from '../../dto/work-types-dto/create-work-types-dto';

@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly workTypesService: WorkTypesService) {}

  @Get()
  findAll(): Promise<IWorkTypes[]> {
    return this.workTypesService.findAll();
  }
  @Post()
  async create(@Body() workTypeDTO: CreateWorkTypesDto) {
    return this.workTypesService.create(workTypeDTO);
  }
}
