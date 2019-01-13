import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import {IsString, IsEmail} from 'class-validator'
import * as bcrypt from 'bcrypt'
import {Exclude} from 'class-transformer'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsEmail()
  @Column('text', {nullable: false})
  email: string

  @IsString()
  @Column('text', {nullable: false})
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
  const hash = await bcrypt.hash(rawPassword, 10)
  this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
  return bcrypt.compare(rawPassword, this.password)
  }

}