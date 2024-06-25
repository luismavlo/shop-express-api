import { Router } from 'express';
import { VideogamesRoutes } from './videogames/routes';
import { AuthRoutes } from './auth/routes';


export class AppRoutes {

  static get routes(): Router {

    const router = Router(); 

    router.use('/api/v1/videogames', VideogamesRoutes.routes)
    router.use('/api/v1/auth', AuthRoutes.routes)
    

    //router.use()
    //TODO: aca tambien iran todos los metodos que necesitamos para gestionar los los purchases

    return router;
  }

}




