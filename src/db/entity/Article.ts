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
  create_time: number = 0;

  @Column()
  update_time: number = 0;

  @Column()
  views: number = 0;

  @Column()
  is_delete: number = 0;

}
