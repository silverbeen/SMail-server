import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

// api 요청을 컨트롤 하는 것
// 메소드 어떤것 쓸건지, 서비스에서 어떤 함수 호출 할 건지 , 타입스크림 자료형
// await, async 무조건 다 붙이기 필수!!

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async getCategoryListAll() {
    return await this.categoryService.getCategoryListAll();
  }
}
