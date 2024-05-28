import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {StateLog} from "../stateLog/stateLog.entity";
import {StateLogService} from "./stateLog.service";
import {StateLogController} from "./stateLog.controller";
import {Vehicle} from "../vehicles/vehicle.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([StateLog]),
        Vehicle,
    ],
    providers: [StateLogService],
    controllers: [StateLogController],
})
export class StateLogModule {
}