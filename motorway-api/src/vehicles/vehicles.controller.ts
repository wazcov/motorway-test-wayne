import {Controller, Get, Inject, UseInterceptors} from '@nestjs/common';
import {VehiclesService} from "./vehicles.service";
import {Vehicle} from "./vehicle.entity";

@Controller('/vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService,
    ) {
    }

    @Get() //Example query - not requested in interview and may be disabled
    get(): Promise<Vehicle[]> {
        return this.vehiclesService.findAll();
    }
}
