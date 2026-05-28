import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WorkTypes } from '../../models/WorkTypes';
import IWorkTypes from '../../interfacec/IWorkTypes';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkTypesDto } from '../../dto/work-types-dto/create-work-types-dto';
import { ValidationError, where } from 'sequelize';
import { Logger } from '@nestjs/common';
import IServerMessage from '../../interfacec/IServerMessage';
import Works from '../../models/Works';

@Injectable()
export class WorkTypesService {

  constructor(
    @InjectModel(WorkTypes)
    private workTypesModel: typeof WorkTypes,
    @InjectModel(Works)
    private worksModel: typeof Works,
  ) {  }

  async findAll(): Promise<IWorkTypes[]> {
    return this.workTypesModel.findAll();
  }
  async create(data: CreateWorkTypesDto):Promise<WorkTypes>{
    return new Promise<WorkTypes>(async (resolve, reject)=>{
      try{
        const model = await this.workTypesModel.create(data);
        resolve(model);
      }catch(err){
        if ((err as  ValidationError).name === 'SequelizeUniqueConstraintError'){
          const errorMsg = "Такое название работы уже есть.";
          Logger.error(errorMsg);
          reject(new HttpException(errorMsg, HttpStatus.BAD_REQUEST));
        }else{
          Logger.error('Ошибка BD.');
          console.log(err);
          reject(new HttpException('Ошибка BD.', HttpStatus.BAD_REQUEST));
        }
      }
    });
  }

  async deleteOne(id:number):Promise<IServerMessage>{
    return new Promise<IServerMessage>(async (resolve, rejecrt)=>{      
      const dependence = await this.worksModel.count({where:{workTypesID:id}});
      if (!dependence){
        const count = await this.workTypesModel.destroy({where:{id:id}});
        resolve({
          message:`Удалено ${count} запись(и).`
        });
      }else{
        rejecrt(new HttpException(`Невозможно удалить. Найдено ${dependence} запись(и)(ей)`, HttpStatus.FORBIDDEN));
      }
    })
  }

  async update(id:number, data: CreateWorkTypesDto):Promise<IServerMessage>{
    return new Promise<IServerMessage>(async (resolve, reject)=>{
      const model = await this.workTypesModel.findOne({where:{id:id}});
      if (model){
        let count:number = 0;
        try{
          const [affectedCount] = await this.workTypesModel.update(data, {where: {id: id}});
          count = affectedCount;
          console.log(count);
        }catch(err){
          if ((err as  ValidationError).name === 'SequelizeUniqueConstraintError'){
            const errorMsg = "Такое название работы уже есть.";
            Logger.error(errorMsg);
            reject(new HttpException(errorMsg, HttpStatus.BAD_REQUEST));
          }else{
            Logger.error('Ошибка BD.');
            console.log(err);
            reject( new HttpException('Ошибка BD.', HttpStatus.BAD_REQUEST));
          }
        }
        resolve({
          message:`Обновлено ${count} запись(и).`
        });
      }else{
        reject(new HttpException('Запись не найдена.', HttpStatus.NOT_FOUND));
      }
    });
  }
  async findOne(id:number):Promise<IWorkTypes>{
    return new Promise<IWorkTypes>(async (resolve, reject)=>{
      const model = await this.workTypesModel.findOne({where:{id:id}});
      if (model){
        resolve(model.toJSON());
      }else{
        reject (new HttpException("Запись не найдена", HttpStatus.NOT_FOUND));
      }
    })
  }
}
