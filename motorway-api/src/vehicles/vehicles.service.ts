import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Vehicle} from "./vehicle.entity";

@Injectable()
export class VehiclesService {
  constructor(
      @InjectRepository(Vehicle)
      private vehicleRepository: Repository<Vehicle>,
  ) {
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  findOne(id: number): Promise<Vehicle | null> {
    return this.vehicleRepository.findOneBy({id});
  }
}
