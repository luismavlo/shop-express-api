import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class AuthController {

  constructor(
    //TODO: Do Dependency injection if is required
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  register = async (req: Request, res: Response) => {
    //TODO: implementar el metodo
    return res.status(200).json({ message: 'Hello World!' })
  }

  login = async (req: Request, res: Response) => {
    //TODO: implementar el metodo
    return res.status(200).json({ message: 'Hello World!' })
  }

}