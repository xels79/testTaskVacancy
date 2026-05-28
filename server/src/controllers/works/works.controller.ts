import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WorksService } from '../../services/works/works.service';
import Works from '../../models/Works';
import { CreateWorksDTO } from '../../dto/works-dto/create-works-dto';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('page-size') pageSize?: number,
    @Query('state') state?: number,
    @Query('work-types-id') workTypesID?: number,
  ): Promise<Works[]> {
    return this.worksService.findAll(page, pageSize, state, workTypesID);
  }

  @Post()
  create(@Body() data: CreateWorksDTO) {
    return this.worksService.create(data);
  }
}
