import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service.js';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('postPerUser')
  getTotalUser() {
    return this.analyticsService.getTotalPostPerUser();
  }
  @Get('groupByTodoStatus')
  getTodoStatus(){
    return this.analyticsService.groupByTodoStatus();
  }
  @Get('getPost')
  getPosts(){
  return this.analyticsService.getPosts();
  }
  @Get('sortUsersByName')
  sortUsersByName(){
    return this.analyticsService.sortUsersByName();
  }
  @Get('dashboard')
  getDashBoardData(){
    return this.analyticsService.getDashBoardData();
  }

  
}
