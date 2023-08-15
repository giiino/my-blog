import { Entity, ObjectId, ObjectIdColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "article" })
export class Article {

  @ObjectIdColumn()
  readonly _id: ObjectId;

  @Column()
  category: string = '';

  @Column()
  title: string = '';

  @Column()
  content: string = '';

  @Column()
  coverImage: string = '';

  @Column()
  createTime: number = 0;

  @Column()
  updateTime: number = 0;

  @Column()
  views: number = 0;

  @Column()
  isReadme: number = 0;

  @Column()
  isDelete: number = 0;

}
