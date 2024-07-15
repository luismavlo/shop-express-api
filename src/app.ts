/*import "reflect-metadata"
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { PostgresDatabase } from './data';
import {envs} from "./config";



(async() => {
  main();
})();

async function main(){

  //postgresql://username:password@host:port/database?sslmode=require

  const postgres = new PostgresDatabase({
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE
  })

  await postgres.connect()


  const server = new Server({ 
    port: envs.PORT,
    routes: AppRoutes.routes
  })
  await server.start();
}*/

export function sum(a: number, b: number) {
  return a + b;
}

export function isEven(number: number) {
  return number % 2 === 0;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

export function concatenate(str1: any, str2: any) {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new Error('Both arguments must be strings');
  }
  return str1 + str2;
}

export function isPrime(number: any) {
  if (typeof number !== 'number' || number <= 1 || !Number.isInteger(number)) {
    throw new Error('Input must be an integer greater than 1');
  }
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
