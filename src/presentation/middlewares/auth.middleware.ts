import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User } from '../../data/postgres/models/user.model';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export class AuthMiddleware {

  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if( !authorization ) return res.status(401).json({ message: 'No token provided' });
    if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ message: 'Invalid token'});
    
    const token = authorization.split(' ').at(1) || '';
    
    try {
      const payload = await JwtAdapter.validateToken<{ id: number}>(token);
      if( !payload ) return res.status(401).json({ message: 'Invalid token' })
      console.log("PUNTO C: ", payload)
      const user = await User.findOne({
        where: {
          id: payload.id,
          status: Status.ACTIVE,
          emailValidated: true
        }
      })
      if( !user ) return res.status(401).json({ message: 'Invalid user' });
     
      //tengan en cuanta que si ustedes hacen un endpoint para cambiar contraseña
      //deben validar los tiempos.
      
      req.body.sessionUser = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

  }

}


