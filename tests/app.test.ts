
/*
describe: Este bloque agrupa pruebas relacionadas entre sí. En este caso, estamos agrupando todas las pruebas relacionadas con App.js. Puedes pensar en esto como una forma de organizar tus pruebas

test: Cada prueba individual se define con el bloque test. Aquí definimos lo que queremos probar. El primer argumento es una descripción de lo que estamos probando y el segundo argumento es una función que contiene la lógica de la prueba.

expect: Esta es la función que utilizamos para verificar si el resultado de nuestra función es el esperado. En este caso, estamos esperando que sum(1, 2) sea igual a 3.

Matchers: Jest proporciona diferentes matchers (manejadores) que nos permiten hacer diferentes tipos de aserciones. En este ejemplo, hemos utilizado toBe para comprobar la igualdad exacta. Otros ejemplos de matchers incluyen toEqual, toBeTruthy, toBeNull, etc.

El término AAA (Arrange, Act, Assert) (preparar, actuar, asegurar) es un patrón común utilizado en las pruebas unitarias para estructurar el código de prueba de manera clara y legible. Vamos a desglosar el concepto y aplicarlo a las pruebas que has proporcionado.
*/
import { sum, isEven, divide, multiply, concatenate } from '../src/app';

describe('Testing App.ts', () => {

  test('sum adds 1 + 2 to equal 3', () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expectedSum = 3;
    //Act
    const result = sum(a, b);
    //Assert
    expect(sum(a, b)).toBe(3)
  })

  test('isEven should return true for even numbers', () => {
    //Arrange
    const number = 4;
    const expected = true;

    //Act
    const result = isEven(number);

    //Assert
    //expect(result).toBe(expected)
    expect(result).toBeTruthy()
  })

  test('isEven should return false for odd numbers', () => {
    //Arrange
    const number = 5;
    const expected = false;

    //Act
    const result = isEven(number);

    //Assert
    expect(result).toBe(expected)
    //expect(result).toBeFalsy()
  })

})


describe('Testing divide function', () => {
  
  test('divides 6/2 should return 3', () => {
    const a = 6;
    const b = 2;
    const expected = 3;

    const result = divide(a, b)

    expect(result).toBe(expected)
  })

  test('divides -6/2 should return -3', () => {
    const a = -6;
    const b = 2;
    const expected = -3;

    const result = divide(a, b)

    expect(result).toBe(expected)
  })

  test('throws an error when dividing by zero', () => {
    // const a = 6;
    // const b = 0;

    // const result = divide(a, b)

    // expect(result).toBe('Cannot divide by zero')

    expect(() => divide(6, 0)).toThrow('Cannot divide by zero')

  })

})


describe('Testing multiply function', () => {

  test('multiplies 2 * 3 should return 6', () => {
    const a = 2;
    const b = 3;

    const result = multiply(a, b);

    expect(result).toBe(6)
  })

  test('multiplies -2 * 3 should return -6', () => {
    const a = -2;
    const b = 3;

    const result = multiply(a, b);

    expect(result).toBe(-6)
  })

  test('multiplies 10 * 0 should return 0', () => {
    const a = 10;
    const b = 0;

    const result = multiply(a, b);

    expect(result).toBe(0)
  })

})


describe('Testing concatenate function', () => {

  // prueba para 2 palabras 
  test('concatenates "hello" and " world" should return "hello world"', () => {
    const str1 = 'hello';
    const str2 = ' world';
    const expected = 'hello world';

    const result = concatenate(str1, str2);

    expect(result).toBe(expected)
  })

  //  un numero y un string
  test('should return a throw Error if the first argument is not a string', () => {
    expect(() => concatenate(1, 'world')).toThrow('Both arguments must be strings')
  })

  //  un string y un numero
  test('should return a throw Error if the second argument is not a string', () => {
    expect(() => concatenate("hello", 3)).toThrow('Both arguments must be strings')
  })

})

describe('Testing isPrime function', () => {})