

export class CreatePurchaseDTO {
  private constructor(
    public readonly userId: number,
    public readonly videogameId: number
  ){}

 
  static create( object: { [key : string] : any } ): [string?, CreatePurchaseDTO?] {
    const { userId, videogameId } = object;
    
    if( !userId ) return ['Missing userId']
    if( typeof (userId) !== 'number' ) return ['userId must be a number']
    if( !videogameId ) return ['Missing videogameId']
    if( typeof (videogameId) !== 'number' ) return ['videogameId must be a number']

    return [undefined, new CreatePurchaseDTO(userId, videogameId)]
  }
}
