import { Request, Response } from 'express';
import { VideogameService } from '../services/videogame.service';
import { CreateVideogameDto, CustomError, UpdateVideogameDto } from '../../domain';

export class VideogamesController {

  constructor(
    public readonly videogameService: VideogameService
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

  createVideogame = (req: Request, res: Response) => {
    const [ error, createVideogameDto ] = CreateVideogameDto.create(req.body);
    if( error ) return res.status(422).json({ message: error })

    this.videogameService.createVideogame(createVideogameDto!, req.files as Express.Multer.File[])
      .then(videogame => res.status(201).json(videogame))
      .catch((error: unknown) => this.handleError(error, res))
  }

  getVideogames = (req: Request, res: Response) => {
    this.videogameService.findAllVideogames()
      .then(videogames => res.status(200).json(videogames))
      .catch((error: unknown) => this.handleError(error, res))
  }

  getVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }
    this.videogameService.findOneVideogameById(+id)
      .then(videogame => res.status(200).json(videogame))
      .catch((error: unknown) => this.handleError(error, res))
  }

  updateVideogameById = (req: Request, res: Response) => {

    const { id } = req.params;
    const [error, updateVideogameDto] = UpdateVideogameDto.create(req.body);

    if (isNaN(+id)) {
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }

    if( error ) return res.status(422).json({ message: error })

    this.videogameService.updateVideogame(updateVideogameDto!, +id)
      .then(videogame => res.status(200).json(videogame))
      .catch((error: unknown) => res.status(500).json(error))
  }

  deleteVideogameById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }

    this.videogameService.deleteVideogame(+id)
      .then(() => res.status(204).json())
      .catch((error: unknown) => res.status(500).json(error))
  }

}


