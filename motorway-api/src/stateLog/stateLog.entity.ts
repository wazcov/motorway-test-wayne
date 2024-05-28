import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Vehicle} from "../vehicles/vehicle.entity";
import {IsISO8601} from "class-validator";

@Entity('stateLogs')
export class StateLog {
    @PrimaryColumn()
    vehicleId: number;

    @Column()
    state: string;

    @Column()
    @IsISO8601()
    timestamp: string;

    @ManyToOne(() => Vehicle, vehicle => vehicle.stateLogs)
    vehicle: Vehicle;
}