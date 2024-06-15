import { Request, Response } from 'express';

export class VideogamesController {

  constructor(){}

  createVideogame = (req: Request, res: Response) => {
    const { name, price, description } = req.body;


    return res.status(201).json({ name, price, description });
  }

  getVideogames = (req: Request, res: Response) => {

    return res.status(200).json({
      message: 'videojuegos listados'
    })
  }

  getVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;

    return res.status(200).json({
      message: `videojuego con id ${id} listado`
    })
  }

  updateVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    return res.status(200).json({
      message: `videojuego con id ${id} actualizado`
    })
  }

  deleteVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;

    return res.status(204).json()
  }

}


