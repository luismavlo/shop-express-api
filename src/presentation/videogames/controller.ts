import { Request, Response } from 'express';
import { VideogameService } from '../services/videogame.service';

export class VideogamesController {

  constructor(
    public readonly videogameService: VideogameService
  ){}

  createVideogame = (req: Request, res: Response) => {
    const { name, price, description } = req.body;

    this.videogameService.createVideogame({name, price, description}) // el objeto es videogameData
      .then(videogame => {
        return res.status(201).json(videogame)
      })
      .catch((error: any) => {
        return res.status(500).json(error)
      })
  }

  getVideogames = (req: Request, res: Response) => {
    this.videogameService.findAllVideogames()
      .then(videogames => {
        return res.status(200).json(videogames)
      })
      .catch((error: any) => {
        return res.status(500).json(error)
      })
  }

  getVideogameById = (req: Request, res: Response) => {
    const { id } = req.params; 
    if(isNaN(+id)){
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }

    this.videogameService.findOneVideogameById(+id)
      .then(videogame => {
        return res.status(200).json(videogame)
      })
      .catch((error: any) => {
        console.log(error);
        return res.status(500).json(error)
      })
  }

  updateVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if(isNaN(+id)){
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }

    this.videogameService.updateVideogame({ name, price, description }, +id)
      .then(videogame => {
        return res.status(200).json(videogame)
      })
      .catch((error: any) => {
        console.log(error);
        return res.status(500).json(error)
      })
  }

  deleteVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;
    if(isNaN(+id)){
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }

    this.videogameService.deleteVideogame(+id)
      .then(() => {
        return res.status(204).json()
      })
      .catch((error: any) => {
        return res.status(500).json(error)
      })
  }

}


