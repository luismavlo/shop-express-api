import { Router } from 'express';
import { VideogamesController } from './controller';
import { VideogameService } from '../services/videogame.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';


export class VideogamesRoutes {


  static get routes(): Router {

    const router = Router();

    const videogameService = new VideogameService()
    const controller = new VideogamesController(videogameService)
    
    
    router.use(AuthMiddleware.protect)
    router.get('/', controller.getVideogames)
    router.post('/', controller.createVideogame )
    router.get('/:id', controller.getVideogameById )
    router.patch('/:id', controller.updateVideogameById )
    router.delete('/:id', controller.deleteVideogameById )

    return router;

  }

}