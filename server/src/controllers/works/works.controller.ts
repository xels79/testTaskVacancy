import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WorksService } from '../../services/works/works.service';
import Works from '../../models/Works';
import { CreateWorksDTO } from '../../dto/works-dto/create-works-dto';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}
  @Get('/total')
  getTotal(
    @Query('date-completeon') dateComeletion?: string,
    @Query('entries-before') entriesBefore?: string,
  ){
    return this.worksService.total( dateComeletion, entriesBefore );
  }
  
  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('page-size') pageSize?: number,
    @Query('date-completeon') dateComeletion?: string,
    @Query('work-types-id') workTypesID?: string,
    @Query('entries-before') entriesBefore?: string,
  ): Promise<Works[]> {
    return this.worksService.findAll(page, pageSize, dateComeletion, workTypesID, entriesBefore);
  }

  @Post()
  create(@Body() data: CreateWorksDTO) {
    return this.worksService.create(data);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number){
    return this.worksService.deleteOne(id);
  }
}
