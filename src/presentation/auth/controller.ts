import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { LoginUserDTO } from '../../domain/dtos/auth/login-user.dto';

export class AuthController {

  constructor(
    private readonly authService: AuthService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  register = async (req: Request, res: Response) => {
    const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
    if(error) return res.status(422).json({ message: error });

    this.authService.register(registerUserDto!, req.file)
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res))
  }

  login = async (req: Request, res: Response) => {
    const [ error, loginUserDto ] = LoginUserDTO.create(req.body);
    if(error) return res.status(422).json({ message: error });

    this.authService.login(loginUserDto!)
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res))
  }

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService.validateEmail( token )
        .then(() => res.json('Email was validated properly'))
        .catch(error => this.handleError(error, res))
  }

  getProfile = (req: Request, res: Response) => {
    const { id } = req.body.sessionUser;

    this.authService.getProfileForRoutes(+id)
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res))
  }

}