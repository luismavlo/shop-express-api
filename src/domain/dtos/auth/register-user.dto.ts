import { regularExps } from '../../../config';


export class RegisterUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string,
  ) {}


  static create (object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { firstName, surname, email, password } = object;

    if (!firstName) return ['Missing firstName']
    if (!surname) return ['Missing surname']
    if (!email) return ['Missing email']
    if (!regularExps.email.test(email)) return ['Invalid email']
    if (!password) return ['Missing password']
    if (!regularExps.password.test(password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character']

    return [undefined, new RegisterUserDto(firstName, surname, email, password)]
  }
}
