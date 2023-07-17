import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: "article" })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

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
