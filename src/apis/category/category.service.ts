import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryList } from '../../entities/CategoryList';
import { Content } from '../../entities/Content';

// 실질적인 로직 짜는 곳
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryList)
    private readonly categoryListRepository: Repository<CategoryList>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async getCategoryListAll() {
    const categoryTitleList = await this.categoryListRepository.find();

    const categoryList = await Promise.all(
      categoryTitleList.map(async (category) => {
        const test = {
          title: category.title,
          list: [],
        };
        const categories = await this.categoryRepository
          .createQueryBuilder('content')
          .select('content.field_id', 'fieldId')
          .addSelect('content.category_id', 'categoryId')
          .addSelect('content.field_name', 'fieldName')
          .addSelect('COUNT(content.category_id)', 'contentCnt')
          .where('content.category_id = :id', { id: category.categoryListId })
          .groupBy('content.field_id')
          .getRawMany();

        test.list = categories;

        return test;
      }),
    );

    return categoryList;
  }
}
