import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email: email.toLowerCase(),
    });
  }

  async create(email: string, password: string) {
    const user = new this.userModel({
      email: email.toLowerCase(),
      password,
    });

    return user.save();
  }
}