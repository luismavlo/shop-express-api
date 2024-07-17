import "reflect-metadata"
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { PostgresDatabase } from './data';
import {envs} from "./config";



(async() => {
  main();
})();

export async function main(){

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
}

