import { Router } from 'express';
import { VideogamesController } from './controller';


export class VideogamesRoutes {


  static get routes(): Router {

    const router = Router();

    const controller = new VideogamesController()

    router.get('/', controller.getVideogames)
    router.post('/', controller.createVideogame )
    router.get('/:id', controller.getVideogameById )
    router.patch('/:id', controller.updateVideogameById )
    router.delete('/:id', controller.deleteVideogameById )

    return router;

  }

}