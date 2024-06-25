import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import {User} from "../../data/postgres/models/user.model";
import {CustomError} from "../../domain";
import {bcryptAdapter} from "../../config";

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export class AuthService {

  constructor(){}

  public async register( registerUserDto: RegisterUserDto ){
    const existUser = await User.findOne({
      where: {
        email: registerUserDto.email,
        status: Status.ACTIVE
      }
    })

    if( existUser ) throw CustomError.badRequest('Email already exist')

    const user = new User()
    user.first_name = registerUserDto.firstName;
    user.surname = registerUserDto.surname;
    user.email = registerUserDto.email;
    user.password = bcryptAdapter.hash(registerUserDto.password)

    try {
      return await user.save()
    } catch ( error: any ) {
      throw CustomError.internalServer(error)
    }
  }

} 