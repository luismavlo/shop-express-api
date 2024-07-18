import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import {User} from "../../data/postgres/models/user.model";
import {CustomError} from "../../domain";
import {bcryptAdapter, envs} from "../../config";
import {JwtAdapter} from "../../config/jwt.adapter";
import {EmailService} from "./email.service";
import { LoginUserDTO } from '../../domain/dtos/auth/login-user.dto';
import { DataSource } from 'typeorm';
import { PostgresDatabase } from '../../data';
import { generateUUID } from '../../config/genereta-uuid.adapter';
import { UploadFile } from '../../config/upload-files-cloud.adapter';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export class AuthService {

  constructor(
      private readonly emailService: EmailService
  ){}

  public async register( registerUserDto: RegisterUserDto, file: Express.Multer.File | undefined ){
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
    user.password = registerUserDto.password

    if( file?.originalname && file.originalname.length > 0){
      const path = `users/${ generateUUID() }-${ file.originalname }`;
      const photoUrl = await UploadFile.uploadToCloud(path, file.buffer)
      user.avatar = photoUrl;
    }
    

    try {
      await user.save()

      await this.sendEmailValidationLink( user.email );

      const token = await JwtAdapter.generateToken({ id: user.id } )
      if( !token ) throw CustomError.internalServer('Error while creating JWT')

      return {
        id: user.id,
        firstName: user.first_name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      }

    } catch ( error: any ) {
      throw CustomError.internalServer(error)
    }
  }

  public sendEmailValidationLink = async ( email: string ) => {

    const token = await JwtAdapter.generateToken({ email })
    if( !token ) throw CustomError.internalServer('Error getting token')

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${ token }`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${ link }">Validate your email: ${email}</a>
    `

    const isSent = this.emailService.sendEmail({
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    })
    if( !isSent ) throw CustomError.internalServer('Error sending email');

    return true;
  }

  public validateEmail = async(token:string) => {
    const payload = await JwtAdapter.validateToken(token)
    if( !payload ) throw CustomError.unAuthorized('Invalid Token');

    const { email } = payload as { email: string };
    if( !email ) throw CustomError.internalServer('Email not in token');

    const user = await User.findOne({ where: { email: email }})
    if( !user ) throw CustomError.internalServer('Email not exist')

    user.emailValidated = true;
    try {
      await user.save()

      return true;
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong");
    }
  }

  public async login( loginUserDTO: LoginUserDTO ){
    //1. buscar el usuario que se quiere loguear
    const user = await User.findOne({
      where: {
        email: loginUserDTO.email,
        status: Status.ACTIVE,
        emailValidated: true
      }
    })
    if( !user ) throw CustomError.unAuthorized("Invalid credentials")
    //2. validar si la contraseña es correcta
    const isMatching = bcryptAdapter.compare(loginUserDTO.password, user.password);
    if( !isMatching ) throw CustomError.unAuthorized("Invalid credentials")
    //3. generar el token 
    const token = await JwtAdapter.generateToken({ id: user.id })
    if( !token ) throw CustomError.internalServer('Error while creating JWT')
    //4. enviar la informacion al cliente
    return {
      token: token,
      user: {
        id: user.id,
        firstName: user.first_name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      }
    }
  }

  public async getProfile(id: number){
    const user = await User.findOne({
      select: {
        purchases: {
          id: true,
          status: true,
          videogame: {
            id: true,
            title: true,
            description: true,
            price: true,
            status: true
          }
        }
      },
      where: {
        id: id,
        status: Status.ACTIVE
      },
      relations: ['purchases', 'purchases.videogame'],
    })

    if(!user) throw CustomError.notFound('User not found')

    return user;
  }

  public async getProfileForRoutes(id: number){
    const user = await User.findOne({
      where: {
        id: id,
        status: Status.ACTIVE
      },
    })

    if(!user) throw CustomError.notFound('User not found')

    return {
      id: user.id,
      firstName: user.first_name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    }
  }

}