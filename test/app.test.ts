/*
describe: Este bloque agrupa pruebas relacionadas entre sí. En este caso, estamos agrupando todas las pruebas relacionadas con App.js. Puedes pensar en esto como una forma de organizar tus pruebas

test: Cada prueba individual se define con el bloque test. Aquí definimos lo que queremos probar. El primer argumento es una descripción de lo que estamos probando y el segundo argumento es una función que contiene la lógica de la prueba.

expect: Esta es la función que utilizamos para verificar si el resultado de nuestra función es el esperado. En este caso, estamos esperando que sum(1, 2) sea igual a 3.

Matchers: Jest proporciona diferentes matchers (manejadores) que nos permiten hacer diferentes tipos de aserciones. En este ejemplo, hemos utilizado toBe para comprobar la igualdad exacta. Otros ejemplos de matchers incluyen toEqual, toBeTruthy, toBeNull, etc.

El término AAA (Arrange, Act, Assert) (preparar, actuar, asegurar) es un patrón común utilizado en las pruebas unitarias para estructurar el código de prueba de manera clara y legible. Vamos a desglosar el concepto y aplicarlo a las pruebas que has proporcionado.
*/

import { sum, isEven, isPrime, concatenate, divide, multiply } from '../src/app';

describe('Testing App.ts', () => {

  test('sum adds 1 + 2 to equal 3', () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expectedSum = 3;

    // Act
    const result = sum(a, b);

    // Assert
    expect(result).toBe(expectedSum);
  });

  test('isEven should return true for even numbers', () => {
    // Arrange
    const number = 4;
    const expected = true;

    // Act
    const result = isEven(number);

    // Assert
    expect(result).toBe(expected);
  });

  test('isEven should return false for odd numbers', () => {
    // Arrange
    const number = 3;
    const expected = false;

    // Act
    const result = isEven(number);

    // Assert
    expect(result).toBe(expected);
  });

});

describe('multiply function', () => {
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('multiplies -1 * 5 to equal -5', () => {
    expect(multiply(-1, 5)).toBe(-5);
  });

  test('multiplies 0 * 5 to equal 0', () => {
    expect(multiply(0, 5)).toBe(0);
  });
});


describe('divide function', () => {
  test('divides 6 / 2 to equal 3', () => {
    expect(divide(6, 2)).toBe(3);
  });

  test('divides -6 / 2 to equal -3', () => {
    expect(divide(-6, 2)).toBe(-3);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(6, 0)).toThrow('Cannot divide by zero');
  });
});

describe('concatenate function', () => {
  test('concatenates "Hello" and " World" to equal "Hello World"', () => {
    expect(concatenate('Hello', ' World')).toBe('Hello World');
  });

  test('throws an error if the first argument is not a string', () => {
    expect(() => concatenate(123, ' World')).toThrow('Both arguments must be strings');
  });

  test('throws an error if the second argument is not a string', () => {
    expect(() => concatenate('Hello', 456)).toThrow('Both arguments must be strings');
  });
});

describe('isPrime function', () => {
  test('returns true for prime number 7', () => {
    expect(isPrime(7)).toBe(true);
  });

  test('returns false for non-prime number 4', () => {
    expect(isPrime(4)).toBe(false);
  });

  test('throws an error for input less than or equal to 1', () => {
    expect(() => isPrime(1)).toThrow('Input must be an integer greater than 1');
  });

  test('throws an error for non-integer input', () => {
    expect(() => isPrime(4.5)).toThrow('Input must be an integer greater than 1');
  });

  test('throws an error for non-number input', () => {
    expect(() => isPrime('seven')).toThrow('Input must be an integer greater than 1');
  });
});

/*
Tarea

1. Multiplicación de dos números: Los alumnos deben probar la multiplicación de números positivos, negativos y cero. 

2. División de dos números: Los alumnos deben probar la división y manejar el caso de división por cero, que debe lanzar un error.

3. Concatenación de cadenas: Los alumnos deben probar la concatenación de cadenas y manejar errores si alguno de los argumentos no es una cadena.

4. Verificar si un número es primo: Los alumnos deben probar si un número es primo y manejar errores para entradas no válidas (números menores o iguales a 1, números no enteros, y entradas que no sean números).

*/

