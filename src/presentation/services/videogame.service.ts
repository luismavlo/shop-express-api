import { Videogame } from '../../data';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class VideogameService {

  constructor(){}

  //TODO: cambiar el tipo de dato any
  async createVideogame(videogameData: any){
    try {
      const videogame = new Videogame();
      videogame.title = videogameData.name.toLowerCase().trim();
      videogame.description = videogameData.description.toLowerCase().trim();
      videogame.price = videogameData.price;

      await videogame.save();

      return videogame;

    } catch (error: any) {
      console.log(error) //TODO: manejar errores
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
      console.log(error)
    }
  }

  async findOneVideogameById(id: number){
    try {
      const videogame = await Videogame.findOne({
        where: {
          id: id,
          status: Status.ACTIVE
        }
      })

      if(!videogame){
        throw new Error('El videojuego no existe') //TODO: manejar errores
      }

      return videogame;
    } catch (error: any) {
      throw new Error('Internal Server Error');
      console.log(error)
    }
  }

  async updateVideogame(videogameData: any, id: number){

    const videogame = await this.findOneVideogameById(id);

    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price;

    try {
      await videogame.save()

      return videogame;
    } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error');
    }
  }

} 