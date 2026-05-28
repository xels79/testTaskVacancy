import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTypes } from './models/WorkTypes';
import { WorkTypesModule } from './modules/work-types/work-types.module';
import { WorksModule } from './modules/works/works.module';
import Works from './models/Works';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './data/database.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [WorkTypes, Works]
    }),
    WorkTypesModule,
    WorksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
