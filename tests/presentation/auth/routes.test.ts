import { envs } from '../../../src/config'
import { PostgresDatabase } from '../../../src/data'
import { User } from '../../../src/data/postgres/models/user.model'
import { testServer } from '../../test-server'
import request from 'supertest'


describe('AUTH route testing', () => {

  let userCreated: User;

  beforeAll(async () => {
    await testServer.start()
    await new PostgresDatabase({
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_DATABASE
    }).connect()

    const user = new User();
    user.first_name = 'user';
    user.surname = 'prueba';
    user.email = "userprueba@gmail.com";
    user.password = 'pass123456*';
    user.emailValidated = true;

    userCreated = await user.save();

  })

  afterAll(async() => {
    const user = await User.findOne({
      where: {
        email: 'userprueba@gmail.com'
      }
    })
    if( user ) await user.remove();

  })

  describe('Test login user', () => {

    test('Should login user', async () => {

      const { body } = await request( testServer.app )
        .post('/api/v1/auth/login')
        .send({email: 'userprueba@gmail.com', password: 'pass123456*'})
        .expect(200)
      
      expect( body ).toEqual({
        token: expect.any(String),
        user: {
          id: userCreated.id,
          firstName: userCreated.first_name,
          surname: userCreated.surname,
          email: userCreated.email,
          role: userCreated.role,
        }
      })

    })

    test('Should return 422 status error when user loggin whitout credentials', async() => {
      await request( testServer.app )
        .post('/api/v1/auth/login')
        .send()
        .expect(422)
    })

    test('Should return 401 status error wehn user does not exist', async() => {
      const { body } = await request( testServer.app )
        .post('/api/v1/auth/login')
        .send({ email: 'usuariosinexistir@gmail.com', password: 'pass123456*' })
        .expect(401)

      expect( body ).toEqual({
        message: 'Invalid credentials'
      })
    })

    test('should return 401 status error when password is wrong', async() => {
      const { body } = await request( testServer.app )
        .post('/api/v1/auth/login')
        .send({ email: 'userprueba@gmail.com', password: '123456*' })
        .expect(401)

      expect( body ).toEqual({
        message: 'Invalid credentials'
      })
    })

  })

  describe('Test register user', () => {
    
  })
  
})