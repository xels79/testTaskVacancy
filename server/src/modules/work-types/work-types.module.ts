import { Module } from '@nestjs/common';
import { WorkTypesController } from '../../controllers/work-types/work-types.controller';
import { WorkTypesService } from '../../services/work-types/work-types.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTypes } from '../../models/WorkTypes';

@Module({
    imports: [SequelizeModule.forFeature([WorkTypes])],
    controllers:[WorkTypesController],
    providers:[WorkTypesService],
})
export class WorkTypesModule {}
