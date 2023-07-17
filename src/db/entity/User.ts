import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: "test" })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  avatar_url: string;

  @Column()
  is_admin: number;
}
