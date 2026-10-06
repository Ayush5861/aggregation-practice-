import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller.js';
import { AnalyticsService } from './analytics.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/users.schema.js';
import { PostSchema } from '../posts/schemas/posts.schema.js';
import { TodoSchema } from '../todos/schemas/todos.schema.js';
import { CommentSchema } from '../comments/schemas/comments.schema.js';

@Module({
  imports:[
   MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema
    },
     {
      name: 'Post',
      schema: PostSchema
    },
     {
      name: 'Todo',
      schema: TodoSchema
    },
     {
      name: 'Comment',
      schema: CommentSchema
    }

   ])
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService]
})
export class AnalyticsModule {}
