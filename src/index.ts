import loaders from './loaders';
import express from "express";
import * as http from "http";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import {RoutesConfig} from "./config/routesConfig";
import {UserController} from "./controllers/userController";
import env from "dotenv";
import {Connection, createConnection} from "typeorm";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {Container} from "typedi";
import {Constants} from "./constants/constants";
import {print} from "./utils/utils";
import {StateController} from "./controllers/stateController";

const run = async () => {

    env.config({debug: true});

    const connection: Connection = await createConnection({
        url: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        type: "postgres",
        entities: [
            __dirname + "/models/*.ts"
        ],
        synchronize: true,
    } as PostgresConnectionOptions);

    Container.set(Constants.DB_CONNECTION, connection);

    const app: express.Application = express();
    const routes: Array<RoutesConfig> = [];

    await loaders({app: app});
    // here we are adding middleware to parse all incoming requests as JSON
    app.use(express.json());

// here we are adding middleware to allow cross-origin requests
    app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({all: true})
        ),
    };

    routes.push(new UserController(app));
    routes.push(new StateController(app));

    if (process.env.DEBUG) {
        process.on('unhandledRejection', function (reason) {
            print('Unhandled Rejection:', reason);
            process.exit(1);
        });
    } else {
        loggerOptions.meta = false;
    }


    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.listen(process.env.PORT, () => {
        print(`Server running at http://localhost:${process.env.PORT}`);

    });

    process.on('exit', async () => {
        await connection.close();
    });
};

run();

