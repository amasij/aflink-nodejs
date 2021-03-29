import * as express from 'express';
import {MasterRecordService} from "../services/masterRecordService";
import {Container} from "typedi";


import 'reflect-metadata'
import {print} from "../utils/utils";

export default async ({app}: { app: express.Application }) => {
    const masterRecordService = Container.get(MasterRecordService);

    const numberOfCountries:number = await masterRecordService.countAllCountries();

    if (numberOfCountries == 0) {
        await masterRecordService.loadCountries();
    }

    const numberOfStatesLoaded: number = await masterRecordService.countAllStates();

    if (numberOfStatesLoaded == 0) {
        await masterRecordService.loadStates();
    }

};
