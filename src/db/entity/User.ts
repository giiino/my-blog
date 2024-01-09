import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

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

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string = '';

  @IsNotEmpty()
  @IsString()
  @Column()
  avatar: string = '';

  @IsInt()
  @Length(1)
  @Column()
  isAdmin: number = 0;

  @IsInt()
  @Column()
  createAt: number = 0;
}
