import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comment {
  @Prop()
  postId: number;

  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);