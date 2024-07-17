import request from 'supertest';
import { testServer } from '../../test-server';
import { User } from '../../../src/data/postgres/models/user.model';
import { bcryptAdapter, envs } from '../../../src/config';
import { main } from '../../../src/app';
import { PostgresDatabase } from '../../../src/data';


describe('AUTH route testing', () => {
  let userCreated: User;

  beforeAll(async() => {
    await testServer.start();
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
    user.password = '123456';
    user.emailValidated = true;

    userCreated = await user.save();
  })

  afterAll(async() => {
    const user = await User.findOne({
      where: {
        email: "userprueba@gmail.com"
      }
    })
    await user!.remove()

    const user2 = await User.findOne({
      where: {
        email: "luis@gmail.com"
      }
    })
    if( user2 ) await user2!.remove()
  })

  

  describe('Test login user', () => {
    test('Should login user', async() => {
      const { body } = await request( testServer.app )
        .post('/api/v1/auth/login')
        .send({email: 'userprueba@gmail.com', password: '123456'})
        .expect(200)
  
      expect( body ).toEqual({
        token: expect.any(String),
        user: expect.objectContaining({
          id: userCreated.id,
          firstName: userCreated.first_name,
          surname: userCreated.surname,
          email: userCreated.email,
          role: userCreated.role,
        })
      })
  
    })
  
    test('should return 422 error status when register user with invalid data', async() => {
      await request( testServer.app )
        .post('/api/v1/auth/login')
        .send()
        .expect(422)
    })
  
    test('should return 401 error status when user does not exist', async() => {
      const { body } = await request( testServer.app )
        .post('/api/v1/auth/login')
        .send({email: 'usuariosinexistencia@gmail.com', password: '123456'})
        .expect(401)
  
      expect( body ).toEqual({
        message: 'Invalid credentials'
      })
    })
  
    test('should return 401 error status when email is not validated', async() => {
      const { body } = await request( testServer.app )
        .post('/api/v1/auth/login')
        .send({email: 'userprueba@gmail.com', password: '1234567'})
        .expect(401)
  
      expect( body ).toEqual({
        message: 'Invalid credentials'
      })
    })
  })

  describe('Test register user', () => {

    test('should register user and send status 200', async() => {
      const user = {
        firstName: 'luis',
        surname: 'avendaño',
        email: "luis@gmail.com",
        password: 'Pass12345*',
      }

      const { body } = await request( testServer.app )
        .post('/api/v1/auth/register')
        .send(user)
        .expect(200)

        expect( body ).toEqual({
          id: expect.any(Number),
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
          role: 'CLIENT',
        })

    })

  })

})