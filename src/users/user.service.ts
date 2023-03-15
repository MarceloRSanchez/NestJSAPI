import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ["id", "username", "role"]
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail({
      select: { id: true, username: true, role: true},
      where: { id: id }
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    user.password = this.hashPassword(user.password);
    return this.usersRepository.save(user);
  }

  async edit(user: User): Promise<User> {

    user.password = this.hashPassword(user.password);
    return this.usersRepository.save(user);
  }

  private hashPassword(password: any): string {
    var salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  private checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, encryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, encryptedPassword);
  }
}