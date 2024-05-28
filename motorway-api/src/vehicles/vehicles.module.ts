import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Vehicle} from "./vehicle.entity";
import {VehiclesService} from "./vehicles.service";
import {VehiclesController} from "./vehicles.controller";
import {StateLog} from "../stateLog/stateLog.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Vehicle]),
        StateLog,
    ],
    providers: [VehiclesService],
    controllers: [VehiclesController],
})
export class VehiclesModule {
}