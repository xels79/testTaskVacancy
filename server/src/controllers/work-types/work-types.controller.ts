import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { WorkTypesService } from '../../services/work-types/work-types.service';
import IWorkTypes from '../../interfacec/IWorkTypes';
import { CreateWorkTypesDto } from '../../dto/work-types-dto/create-work-types-dto';

@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly workTypesService: WorkTypesService) {}
  @Get(':id')
  findOne(@Param('id') id:number){
    return this.workTypesService.findOne(id);
  }
  @Get()
  findAll(@Query('page') page?:number = 1, @Query('page-size') pageSize?: number = 10): Promise<IWorkTypes[]> {
    return this.workTypesService.findAll();
  }
  @Post()
  async create(@Body() workTypeDTO: CreateWorkTypesDto) {
    return this.workTypesService.create(workTypeDTO);
  }
  @Put(':id')
  async update(@Param('id') id:number, @Body() workTypeDTO: CreateWorkTypesDto) {
    return this.workTypesService.update(id, workTypeDTO);
  }
  @Delete(':id')
  async deleteOne(@Param('id') id:number){
    return this.workTypesService.deleteOne(id);
  }

}
