

export class CreateVideogameDto {

  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description: string
  ){}

  /**
   * @description esta metodo valida los datos para crear un videojuego
   * @param object este objeto es el que recibimos de el cliente
   * @returns un arreglo con el mensaje de error y el objeto de tipo CreateVideogameDto
   *   
  */
  static create( object: { [key : string] : any } ): [string?, CreateVideogameDto?] {
    const { name, price, description } = object;

    if( !name ) return ['Missing name', undefined]
    if( !price ) return ['Missing price']
    if( price < 0 ) return ['Price must be positive']
    if( !description ) return ['Missing description']
    if( description.length < 10 ) return ['Description must be at least 10 characters']

    return [undefined, new CreateVideogameDto(name, price, description)]

  }

}