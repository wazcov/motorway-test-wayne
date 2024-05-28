import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {StateLog} from "../stateLog/stateLog.entity";
import {Optional} from "@nestjs/common";

@Entity('vehicles')
export class Vehicle {
    @PrimaryColumn()
    id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    state?: string;

    @OneToMany(() => StateLog, (stateLogs) => stateLogs.vehicleId)
    public stateLogs?: StateLog[];
}