

export class UpdateVideogameDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
  ){}

  /**
   * @description esta metodo valida los datos para actualizar un videojuego
   * @param object este objeto es el que recibimos de el cliente
   * @returns un arreglo con el mensaje de error y el objeto de tipo UpdateVideogameDto
   *   
  */
  static create( object: { [key : string] : any } ): [string?, UpdateVideogameDto?] {
    const { name, price } = object;

    if( !name ) return ['Missing name', undefined]
    if( !price ) return ['Missing price']
    if( price < 0 ) return ['Price must be positive']
    

    return [undefined, new UpdateVideogameDto(name, price)]
  }
}