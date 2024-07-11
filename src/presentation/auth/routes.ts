import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { uploadSingle } from '../../config/upload-files.adapter';


export class AuthRoutes {
  
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
        envs.MAILER_SERVICE,
        envs.MAILER_EMAIL,
        envs.MAILER_SECRET_KEY,
        envs.SEND_EMAIL
    )

    const authService = new AuthService(emailService)
    const controller = new AuthController(authService)

    router.post('/login', controller.login)
    router.post('/register', uploadSingle("avatar") ,controller.register)

    router.get('/validate-email/:token', controller.validateEmail)

    router.get('/profile', AuthMiddleware.protect ,controller.getProfile)

    return router;
  }

}
//enviar datos del frontend al servidor en formato formdata para subir imagenes
// const createUser = (data) => {

//   const info = new FormData()
//   info.append('firstname', data.firstname)
//   info.append('surname', data.surname)
//   info.append('avatar', data.avatar)

//   axios.post('/pepitoperez', info)

// }

