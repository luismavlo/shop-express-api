
import {
  BaseEntity, BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, InsertEvent,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {bcryptAdapter} from "../../../config";

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

@Entity()
export class User extends BaseEntity {

  /*constructor(password: string) {
    super()
    this.password = password;
  }*/

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  surname: string;
   
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT
  })
  role: Role;

  @Column({
    type: "boolean",
    default: false,
  })
  emailValidated: boolean

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /*@BeforeInsert()
  encryptPassword(){
    console.log('->',this.password)
    //this.password = bcryptAdapter.hash()
  }*/
}