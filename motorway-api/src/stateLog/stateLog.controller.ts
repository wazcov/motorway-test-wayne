import {BadRequestException, Controller, Get, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {StateLogService} from "./stateLog.service";
import {StateLog} from "./stateLog.entity";
import {SearchDto} from "./stateLog.search.dto";
import {validate} from 'class-validator';

@Controller('/stateLog')
export class StateLogController {
    constructor(
        private readonly stateLogService: StateLogService,
    ) {
    }

    @Get() //Example query - not requested in interview and may be disabled
    get(): Promise<StateLog[]> {
        return this.stateLogService.findAllWithRelations();
    }

    @Get('search')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getByVehicleIdAndTimestamp(
        @Query() searchDto: SearchDto
    ): Promise<StateLog> {
        const errors = await validate(searchDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors.map(error => Object.values(error.constraints)).join(', '));
        }

        // Initially planned to specify params individually but instead use a DTO so we can easily use class-validator for timestamp
        // if(!vehicleId || !timestamp) {
        //     throw new BadRequestException('Search requires a vehicleId and timestamp');
        // }

        return this.stateLogService.findOneByVehicleIdAndTimestamp(searchDto.vehicleId, searchDto.timestamp);

    }

    // Example incorrect - http://localhost:3000/stateLog/search?vehicleId=1&timestamp=123

    // Example correct - http://localhost:3000/stateLog/search?vehicleId=3&timestamp=2022-09-12T12:41:41.000z
}
