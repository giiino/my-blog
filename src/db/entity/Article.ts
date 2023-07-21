import { Entity, ObjectId, ObjectIdColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "article" })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ObjectIdColumn()
  readonly _id: ObjectId;

  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  create_time: number;

  @Column()
  update_time: number;

  @Column()
  is_delete: number;

}
