import { Request, Response } from 'express';

import { CustomError } from '../../domain';

export class AuthController {

  constructor(
    
  ) { }
  /**
   * @description este metodo devuelve un error al cliente, se debe usar en todos los catch
   * @param error error que se quiere devolver
   * @param res response objeto de express Response
   */
  private handleError = (error: unknown, res: Response) => {
    console.log(error)
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }
  
  register = (req: Request, res: Response) => {
   
  }
  

}


