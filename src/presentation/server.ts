import express, { Router } from 'express';


interface Options {
  port: number;
  routes: Router;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start(){
    //* Middlewares
    this.app.use( express.json() ); //* preparar la aplicacion para recibir datos en formato JSON
    this.app.use( express.urlencoded({ extended: true })); //* preparar la aplicacion para recibir datos en formato urlencoded

    this.app.use( this.routes )

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port} 😎`);
    })
  }
}



