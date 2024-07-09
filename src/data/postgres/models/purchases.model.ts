

import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.model';
import { Videogame } from './videogame.model';


enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => Videogame, (videogame) => videogame.purchases)
  videogame: Videogame;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}