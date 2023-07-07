import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryList } from '../../entities/CategoryList';
import { Category } from '../../entities/Category';
import { Content } from '../../entities/Content';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryList, Category, Content])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
