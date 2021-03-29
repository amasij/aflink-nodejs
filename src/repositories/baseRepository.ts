import {Connection, EntityTarget} from "typeorm";
import {Country} from "../models/country";
import {AppRepository} from "./appRepository";

export class BaseRepository<T> {
    constructor(private appRepository: AppRepository, private entity: EntityTarget<T>) {
    }

    async saveAll(items: T[]): Promise<T[]> {
        const repository = this.appRepository.connection.getRepository<T>(this.entity);
        return await repository.save(items);

    }
}
