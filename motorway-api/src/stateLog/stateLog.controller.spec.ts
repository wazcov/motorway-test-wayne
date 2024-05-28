
import {Test, TestingModule} from '@nestjs/testing';
import {StateLogController} from "./stateLog.controller";
import {StateLogService} from "./stateLog.service";
import {StateLog} from "./stateLog.entity";
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {mockRepository, mockStateLogReturnedValue} from "../test/mocks";

describe('StateLog Controller Test', () => {
    let stateLogController: StateLogController;
    let repository: Repository<StateLog>;


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [StateLogController],
            providers: [
                StateLogService,
                {
                    provide: getRepositoryToken(StateLog),
                    useValue: mockRepository,
                }
            ],
        }).compile();

        stateLogController = app.get<StateLogController>(StateLogController);
        repository = app.get<Repository<StateLog>>(getRepositoryToken(StateLog));
    });

    describe('root get', () => {
        it('should return some car data', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue([mockStateLogReturnedValue]);

            const result = await stateLogController.get();

            expect(result).toBeInstanceOf(Array<StateLog>);

            expect(result).toMatchObject([mockStateLogReturnedValue]);

        });
    });

    describe('search', () => {
        it('should return exact car data', async () => {

            const result = await stateLogController.getByVehicleIdAndTimestamp({
                vehicleId: 3,
                timestamp: '2022-09-12T10:00:00.000Z'
            });

            expect(result).toMatchObject(mockStateLogReturnedValue);
        });
    });
});
