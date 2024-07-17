import { Server } from '../src/presentation/server';
import { main } from '../src/app';
import { envs } from '../src/config';

jest.mock('../src/presentation/server');

describe('Should call server with arguments and start', () => {

  test('Should work', async() => {
    await main();

    expect(Server).toHaveBeenCalled();
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      routes: expect.any(Function)
    })
    expect(Server.prototype.start).toHaveBeenCalled();
  })

})

//development
//test
//main