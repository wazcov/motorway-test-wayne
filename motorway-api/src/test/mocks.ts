import {StateLog} from "../stateLog/stateLog.entity";

export const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockStateLogReturnedValue),
    })),
};

export const mockStateLogReturnedValue: StateLog = {
    vehicleId: 3,
    state: "selling",
    timestamp: "2022-09-11T23:21:38.000Z",
    vehicle: {
        id: 3,
        make: "VW",
        model: "GOLF"
    }
}
