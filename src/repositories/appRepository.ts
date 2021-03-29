import {Inject, Service} from "typedi";
import "reflect-metadata";
import {PrismaClient} from '@prisma/client'
import {Connection, createConnection} from "typeorm";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {Constants} from "../constants/constants";

@Service()
export class AppRepository {

      constructor(@Inject(Constants.DB_CONNECTION) private _connection: Connection)  {

    }


    get connection(): Connection {
        return <Connection>this._connection;
    }

    async close(){
          if(this._connection){
             await this._connection.close();
          }

    }



}
