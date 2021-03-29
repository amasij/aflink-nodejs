import {AppRepository} from "./appRepository";
import {Service} from "typedi";
import {BaseRepository} from "./baseRepository";
import {Country} from "../models/country";
import {Repository} from "typeorm";
import {print} from "../utils/utils";

@Service()
export class CountryRepository extends BaseRepository<Country>{
    constructor(private db: AppRepository) {
        super(db,Country);
    }

    async findByAlpha2(alpha2:string):Promise<Country>{
        const repository:Repository<Country> = this.db.connection.getRepository(Country);
        return repository.findOneOrFail({alpha2});
    }

}
