import { UploadFile } from '../../config/upload-files-cloud.adapter';
import { Videogame } from '../../data';
import { CreateVideogameDto, CustomError, UpdateVideogameDto } from '../../domain';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class VideogameService {

  constructor() { }

  /**
   * description este metodo crea un videojuego
   * @param videogameData este es el objeto que contiene los datos del videojuego
   * @returns retorna un videojuego creado, retorna una instancia del modelo videogame
   * @erros internal server
   */
  async createVideogame (
    videogameData: CreateVideogameDto, 
    files: Express.Multer.File[] | undefined ) {
    const videogame = new Videogame();

    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price;

    if( files && files.length > 0){
      const imgs = await UploadFile.uploadMultipleFilesToFirebase('videogames', files)
      videogame.imgs = imgs;
    }

    try {
      return await videogame.save();
    } catch (error: any) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }
  /**
   * @description este metodo busca todos los videojuegos activos
   * @returns retorna una promesa con todos los videojuegos, retorna una instancia del modelo videogame
   * @erros internal server
   */
  async findAllVideogames () {
    try {
      return await Videogame.find({
        where: {
          status: Status.ACTIVE
        },
      });

    } catch (error: any) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }
  /**
   * @description este metodo devuelve una promesa con el videojuego por id
   * @param id id de tipo number del videojuego que se quiere obtener
   * @returns retorna una promesa del videojuego, retorna una instancia del modelo videogame
   * @erros not found videogame, internal server
   */
  async findOneVideogameById (id: number) {
    const videogame = await Videogame.findOne({
      where: {
        id: id,
        status: Status.ACTIVE
      }
    })

    if (!videogame) {
      throw CustomError.notFound(`videogame with id ${id} not found`)
    }

    return videogame;
  }

  /**
   * @description este metodo actualiza un videojuego
   * @param videogameData este es el objeto que contiene los datos del videojuego
   * @param id id de tipo number del videojuego que se quiere actualizar
   * @returns retorna una promesa del videojuego actualizado, retorna una instancia del modelo videogame
   * @erros not found videogame, internal server
   */
  async updateVideogame (videogameData: UpdateVideogameDto, id: number) {

    const videogame = await this.findOneVideogameById(id);

    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.price = videogameData.price;

    try {
      return await videogame.save()
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  /**
   * @description este metodo elimina un videojuego
   * @param id id del videojuego que se quiere eliminar
   * @returns una promesa vacia
   * @erros not found videogame, internal server
   */
  async deleteVideogame (id: number) {
    const videogame = await this.findOneVideogameById(id)

    videogame.status = Status.INACTIVE //esto es soft delete
    //videogame.remove() elimimar el videojuego fisicamente

    try {
      await videogame.save()
      return;
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

} 