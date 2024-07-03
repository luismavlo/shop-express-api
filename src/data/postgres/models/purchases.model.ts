

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'int'
  })
  user_id: number;
  
  @Column({
    nullable: false,
    type: 'int'
  })
  videogame_id: number;

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
}