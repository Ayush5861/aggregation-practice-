import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);