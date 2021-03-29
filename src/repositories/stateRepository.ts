import {AppRepository} from "./appRepository";
import {Service} from "typedi";
import {BaseRepository} from "./baseRepository";
import {State} from "../models/state";
import {Repository} from "typeorm";
import {Country} from "../models/country";
import {EntityStatusConstant} from "../models/entityStatusConstant";

@Service()
export class StateRepository extends BaseRepository<State> {
    constructor(private db: AppRepository) {
        super(db, State);
    }

    async findActiveStatesByCountryAlpha2(alpha2: string): Promise<State[]> {
        const repository: Repository<State> = this.db.connection.getRepository(State);
        return repository.createQueryBuilder('state')
            .leftJoin(Country, 'country', 'country.id = state.countryId')
            .where('country.alpha2 = :alpha2', {alpha2})
            .andWhere('state.status = :status', {status: EntityStatusConstant.ACTIVE})
            .getMany();
    }

}
