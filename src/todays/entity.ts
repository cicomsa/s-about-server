import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export default class Todays extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text', { nullable: true })
  todays: string;

  @Column('text', { nullable: true, default: new Date().toJSON().slice(0, 10) })
  date: string;
}
