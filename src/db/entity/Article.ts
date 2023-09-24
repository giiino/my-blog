import { IsOneOrZero } from "@/shared/utils/validator";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "article" })
export class Article {

  @ObjectIdColumn()
  readonly _id: ObjectId;

  @IsNotEmpty()
  @IsString()
  @Column()
  category: string = '';

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string = '';

  @IsNotEmpty()
  @IsString()
  @Column()
  content: string = '';

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  @Column()
  coverImage: string = '';

  @IsInt()
  @Column()
  createTime: number = 0;

  @IsInt()
  @Column()
  updateTime: number = 0;

  @IsInt()
  @Column()
  views: number = 0;

  @IsInt()
  @IsOneOrZero()
  @Column()
  isReadme: number = 0;

  @IsInt()
  @IsOneOrZero()
  @Column()
  isDelete: number = 0;

}
