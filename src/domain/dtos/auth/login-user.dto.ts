



export class LoginUserDTO {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ){}

 
  static create( object: { [key : string] : any } ): [string?, LoginUserDTO?] {
    const { email, password } = object;

    if( !email ) return ['Missing email']
    if( !password ) return ['Missing password']

    return [undefined, new LoginUserDTO(email, password)]
  }
}
