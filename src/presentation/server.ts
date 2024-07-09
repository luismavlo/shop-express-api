import express, { Router } from 'express';
import cors from 'cors';
import helmet from "helmet";
import hpp from 'hpp';

interface Options {
  port: number;
  routes: Router;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router
  private readonly aceptedOrigins: string[] = ['http://localhost:5173', 'http://localhost:4200']

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start(){
    //* Middlewares
    this.app.use( express.json() ); //* preparar la aplicacion para recibir datos en formato JSON
    this.app.use( express.urlencoded({ extended: true })); //* preparar la aplicacion para recibir datos en formato urlencoded
    this.app.use( cors({
      origin: (origin, callback) => {

        if(!origin){
          return callback(null, true)
        }

        if(this.aceptedOrigins.includes(origin)){
          return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
      }
    }))
    this.app.use( helmet() );
    this.app.use( hpp() );

    this.app.use( this.routes )

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port} 😎`);
    })
  }
}



