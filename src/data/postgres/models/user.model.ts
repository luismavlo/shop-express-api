
import {
  BaseEntity, BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, InsertEvent,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {bcryptAdapter} from "../../../config";
import { Purchase } from './purchases.model';

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
    type: 'varchar',
    nullable: true,
    default: 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png',
    length: 255
  })
  avatar: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  encryptPassword(){
    this.password = bcryptAdapter.hash(this.password)
  }
}