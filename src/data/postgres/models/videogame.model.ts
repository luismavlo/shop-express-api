import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Purchase } from './purchases.model';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

@Entity()
export class Videogame extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    length: 100,
  })
  title: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    nullable: true,
    length: 255
   })
  image: string;

  @Column({
    nullable: false,
    type: 'float'
  })
  price: number;

  @Column({
    type: 'varchar', 
    array:true, 
    nullable: true
  })
  imgs:string[]

  @Column({
    type: 'enum',
    nullable: false,
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status;

  @OneToMany(() => Purchase, (purchase) => purchase.videogame)
  purchases: Purchase[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}