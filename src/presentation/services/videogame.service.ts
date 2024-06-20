import { Videogame } from '../../data';
import { CustomError } from '../../domain';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class VideogameService {

  constructor(){}

  //TODO: cambiar el tipo de dato any
  /**
   * description este metodo crea un videojuego
   * @param videogameData este es el objeto que contiene los datos del videojuego
   * @returns retorna un videojuego creado, retorna una instancia del modelo videogame
   */
  async createVideogame(videogameData: any){
    const videogame = new Videogame();

    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price;
    try {
      return await videogame.save();
    } catch (error: any) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  async findAllVideogames(){
    try {
      return await Videogame.find({
        where: {
          status: Status.ACTIVE
        }
      });
    } catch (error: any) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  async findOneVideogameById(id: number){
      const videogame = await Videogame.findOne({
        where: {
          id: id,
          status: Status.ACTIVE
        }
      })

      if(!videogame){
        throw CustomError.notFound(`videogame with id ${id} not found`)
      }

      return videogame;
  }

  async updateVideogame(videogameData: any, id: number){

    const videogame = await this.findOneVideogameById(id);

    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price;

    try {
      return await videogame.save()
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  /**
   * description este metodo elimina un videojuego
   * @param id id del videojuego que se quiere eliminar
   * @returns una promesa vacia
   */
  async deleteVideogame(id: number){
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