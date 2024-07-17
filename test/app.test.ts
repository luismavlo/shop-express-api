/*
describe: Este bloque agrupa pruebas relacionadas entre sí. En este caso, estamos agrupando todas las pruebas relacionadas con App.js. Puedes pensar en esto como una forma de organizar tus pruebas

test: Cada prueba individual se define con el bloque test. Aquí definimos lo que queremos probar. El primer argumento es una descripción de lo que estamos probando y el segundo argumento es una función que contiene la lógica de la prueba.

expect: Esta es la función que utilizamos para verificar si el resultado de nuestra función es el esperado. En este caso, estamos esperando que sum(1, 2) sea igual a 3.

Matchers: Jest proporciona diferentes matchers (manejadores) que nos permiten hacer diferentes tipos de aserciones. En este ejemplo, hemos utilizado toBe para comprobar la igualdad exacta. Otros ejemplos de matchers incluyen toEqual, toBeTruthy, toBeNull, etc.

El término AAA (Arrange, Act, Assert) (preparar, actuar, asegurar) es un patrón común utilizado en las pruebas unitarias para estructurar el código de prueba de manera clara y legible. Vamos a desglosar el concepto y aplicarlo a las pruebas que has proporcionado.
*/

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
  
});


