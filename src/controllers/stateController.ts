import {RoutesConfig} from "../config/routesConfig";
import express from "express";
import {StateService} from "../services/stateService";
import {Container, Inject} from "typedi";
import {print, resolve} from "../utils/utils";

export class StateController extends RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'StatesRoutes');
    }

    configureRoutes() {

        this.app.route(`/states`)
            .get(async (req: express.Request, res: express.Response) => {
                const stateService:StateService = Container.get(StateService);
                let alpha2 = req.query.alpha2;
                let data = await stateService.getAllStatesByCountryAlpha2(alpha2 as string);

                res.status(200).json(data);
            });

        return this.app;
    }

}

{

}
