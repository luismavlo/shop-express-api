import { Router } from 'express';
import { PurchaseController } from './controllers';
import { PurchaseService } from '../services/purchase.service';
import { VideogameService } from '../services/videogame.service';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { envs } from '../../config';
import { AuthMiddleware } from '../middlewares/auth.middleware';

enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export class PurchasesRoutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
    const authService = new AuthService(emailService)
    const videogameService = new VideogameService()

    const purchaseService = new PurchaseService(authService, videogameService)
    const controller = new PurchaseController(purchaseService)

    router.use(AuthMiddleware.protect)

    router.get('/' ,controller.getPurchases)
    router.post('/', controller.createPurchase )
    router.get('/:id', controller.getPurchaseById )
    router.delete('/:id', controller.deletePurchaseById )

    return router;
  }

}