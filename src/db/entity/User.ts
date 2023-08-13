import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: "user" })
export class User {
  @ObjectIdColumn()
  readonly _id: ObjectId;

  @Column()
  identityType: string = '';

  @Column()
  userName: string = '';

  @Column()
  password: string = '';

  @Column()
  avatarUrl: string = '';

  @Column()
  isAdmin: number = 0;

  @Column()
  createAt: number = 0;
}
