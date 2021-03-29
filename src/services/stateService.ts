import {StateRepository} from "../repositories/stateRepository";
import {State} from "../models/state";
import {Service} from "typedi";

@Service()
export class StateService {
    constructor(private stateRepository:StateRepository) {
    }

    async getAllStatesByCountryAlpha2(alpha2:string): Promise<State[]>{
        return await this.stateRepository.findActiveStatesByCountryAlpha2(alpha2);

    }
}
