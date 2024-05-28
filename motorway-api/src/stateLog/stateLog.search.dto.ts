import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class SearchDto {
    @IsNotEmpty()
    vehicleId: number;

    @IsNotEmpty()
    @IsISO8601()
    timestamp: string;
}