import { Task } from './../tasks/task.entity';
import { PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { BaseEntity, Entity,  } from 'typeorm'
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
  
  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[]

  /* For signIn */
  async validatePassword(password: string): Promise<boolean>{
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password;
  }

}