import {Service} from "typedi";
import {MasterRecordRepository} from "../repositories/masterRecordRepository";
import 'reflect-metadata'
import {Country} from "../models/country";
import {copyProperties, print, resolve} from "../utils/utils";
import {EntityStatusConstant} from "../models/entityStatusConstant";
import {CountryRepository} from "../repositories/countryRepository";
import {State} from "../models/state";
import {StateRepository} from "../repositories/stateRepository";
import {StateJSON} from "../interfaces/stateJSON";
import {Transaction} from "typeorm";

const countryList = require('../resources/country.json');
const stateList = require('../resources/state.json');

@Service()
export class MasterRecordService {
    constructor(private masterRecordRepository: MasterRecordRepository,
                private countryRepository: CountryRepository,
                private stateRepository: StateRepository) {
    }

    countAllStates() {
        return this.masterRecordRepository.countAllStates();
    }

    countAllCountries() {
        return this.masterRecordRepository.countAllCountries();
    }

    @Transaction()
    async loadCountries() {
        const countries: Country[] = (countryList as Country[]).map(item => {
            let country: Country = new Country();
            copyProperties<Country>(item, country);
            country.status = EntityStatusConstant.ACTIVE;
            return country;
        });
        await this.countryRepository.saveAll(countries);
        print("All countries loaded");
    }

    @Transaction()
    async loadStates() {
        const states: State[] = [];
        let resolutions = await (stateList as StateJSON[]).map(async (item, index) => {
            const country: Country = await this.countryRepository.findByAlpha2(item.countryAlpha2);
            if (!country) {
                throw new Error("Cannot find country with alpha2: " + item.countryAlpha2);
            }
            let state: State = new State();
            state.name = item.name;
            state.code = item.code;
            state.country = country;
            state.status = EntityStatusConstant.ACTIVE;
            states.push(state);
        });
        await resolve(resolutions);
        await this.stateRepository.saveAll(states);
    }
}
