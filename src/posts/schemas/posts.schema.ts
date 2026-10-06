import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  userId: number;

  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  body: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);