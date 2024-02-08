import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
  @ObjectIdColumn()
  readonly _id: ObjectId;

  @IsNotEmpty()
  @IsString()
  @Column()
  identityType: string = '';

  @IsNotEmpty()
  @IsString()
  @Column()
  userName: string = '';

  @IsString()
  @Column()
  password: string = '';

  @IsNotEmpty()
  @IsString()
  @Column()
  avatar: string = '';

  @IsInt()
  @Column()
  isAdmin: number = 0;

  @IsInt()
  @Column()
  createAt: number = 0;
}
