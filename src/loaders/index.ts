import * as express from "express";
import masterRecordLoader from "./masterRecordLoader";
import {print} from "../utils/utils";

export default async ({ app }: { app: express.Application }) => {

    print("Start loaders");
     await masterRecordLoader({app});
};
