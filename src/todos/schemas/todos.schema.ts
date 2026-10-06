import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  @Prop()
  userId: number;

  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);