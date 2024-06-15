import { Router } from 'express';
import { Request, Response } from 'express';
import { VideogamesRoutes } from './videogames/routes';


export class AppRoutes {

  static get routes(): Router {

    const router = Router(); 

    router.use('/api/v1/videogames', VideogamesRoutes.routes)
    //* aca tambien iran todos los metodos que necesitamos para gestionar los videojuegos

    //router.use()
    //* aca tambien iran todos los metodos que necesitamos para gestionar los los usuarios

    //router.use()
    //* aca tambien iran todos los metodos que necesitamos para gestionar los los purchases

    return router;
  }

}




