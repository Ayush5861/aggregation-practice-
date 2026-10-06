import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/users.schema.js';
import { Model } from 'mongoose';
import { Todo } from '../todos/schemas/todos.schema.js';
import { Post } from '../posts/schemas/posts.schema.js';
import { Comment } from '../comments/schemas/comments.schema.js';

@Injectable()
export class AnalyticsService {
    constructor(
      @InjectModel('User') private userModel:Model<User>,
       @InjectModel('Todo') private todoModel:Model<Todo>,
        @InjectModel('Post') private postModel:Model<Post>,
         @InjectModel('Comment') private commentModel:Model<Comment>,
    ) {}

   getTotalPostPerUser(){
         return this.postModel.aggregate([
         {
         $group:{
           _id : '$userId',
           totalPosts : {
                $sum : 1
           }
         }
         },
         {
            $project : {
                _id : 0,
                userId : '$_id',
                totalPosts : 1
            }
         },
         {
            $sort : {
                userId : 1
            }
         },
         {
            $limit : 5
         }
    //     {
    //        $lookup:{
    //     from : "users",
    //     localField : "userId",
    //     foreignField:"id",
    //     as : "users"
    //    },
    //     },
    //   {
    //     $unwind:'$users'
    //   }
           
        ])
    }
    groupByTodoStatus(){
        return this.todoModel.aggregate([
            {
                $group :{
                   _id : "$completed",
                   total : {
                    $sum : 1
                   }
                }
            },
           {
            $project : {
                _id : 0,
                completed : '$_id',
                total: 1  
            }
           }
        ])

    }
    getPosts(){
       return this.postModel.aggregate([
        {
           $match:{
            userId : 5
           }
        },
        {
            $count : 'totalPostByUser5'
        }
       ]) 
    }
    sortUsersByName(){
        return this.userModel.aggregate([
             {
                $sort : {
                    name : 1
                }
             }
        ])
    }
   async getDashBoardData(){
        const totalUser = await this.userModel.aggregate([
            {
                $count : 'totalUser'
            }
        ])
        const totalPost = await this.postModel.aggregate([
            {
                $count : 'totalPost'
            }
        ])
        const totalComments = await this.commentModel.aggregate([
            {
                $count : 'totalComment'
            }
        ])
        const totalTodos = await this.todoModel.aggregate([
            {
                $count : 'totalTodos'
            }
        ])
        const completedTodos = await this.todoModel.aggregate([
            {
                $match : {
                    completed : true
                }
            },
            {
                $count : 'completedTodos'
            }
        ])
         const pendingTodos = await this.todoModel.aggregate([
            {
                $match : {
                    completed : false
                }
            },
            {
                $count : 'pendingTodos'
            }
        ])
         return {
    totalUsers: totalUser[0]?.totalUser,
    totalPosts: totalPost[0]?.totalPost,
    totalComments: totalComments[0]?.totalComment,
    totalTodos: totalTodos[0]?.totalTodos,
    completedTodos: completedTodos[0]?.completedTodos,
    pendingTodos: pendingTodos[0]?.pendingTodos,
  };
    }

}
