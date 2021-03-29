import {Inject, Service} from "typedi";
import {AppRepository} from "./appRepository";
import {State} from "../models/state";
import {Repository} from "typeorm";
import {Constants} from "../constants/constants";
import {Country} from "../models/country";

@Service()
export class MasterRecordRepository {
    constructor(private db: AppRepository) {

    }

    async countAllStates(): Promise<number> {
        const stateRepository: Repository<State> = this.db.connection.getRepository(State);
        return stateRepository.count();
    }

    async countAllCountries(): Promise<number> {
        const countryRepository: Repository<Country> = this.db.connection.getRepository(Country);
        return countryRepository.count();
    }

}
