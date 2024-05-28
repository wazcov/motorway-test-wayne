import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {StateLog} from "./stateLog.entity";

@Injectable()
export class StateLogService {
    constructor(
        @InjectRepository(StateLog)
        private stateLogRepository: Repository<StateLog>,
    ) {
    }

    findAllWithRelations(): Promise<StateLog[]> {
        return this.stateLogRepository.find({
            relations: ['vehicle'],
        });
    }

    findOneByVehicleIdAndTimestamp(vehicleId: number, timestamp: string): Promise<StateLog | null> {
        // return this.stateLogRepository.findOne({
        //     where: {vehicleId, timestamp},
        //     relations: ['vehicle'],
        //     select: {
        //         vehicle: {
        //             id: true,
        //             make: true,
        //             model: true,
        //         }
        //     } //this select allows us to exclude the final car state from the query which we may or may not want
        // });
        return this.stateLogRepository
            .createQueryBuilder('stateLog')
            .where('stateLog.vehicleId = :vehicleId', {vehicleId})
            .andWhere('stateLog.timestamp <= :timestamp', {timestamp})
            .leftJoinAndSelect('stateLog.vehicle', 'vehicle')
            .orderBy('stateLog.timestamp', 'DESC')
            .select([ //this select allows us to exclude the final car state from the query which we may or may not want
                'stateLog',
                'vehicle.id',
                'vehicle.make',
                'vehicle.model',
            ])
            .getOne();

    }
}
