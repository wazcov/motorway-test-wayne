import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {VehiclesModule} from "./vehicles/vehicles.module";
import {StateLogModule} from "./stateLog/stateLog.module";
import {CacheInterceptor, CacheModule} from "@nestjs/cache-manager";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'password',
            database: 'motorway',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
        }),
        CacheModule.register({
            store: 'memory', //For production we should use a Reddis server to handle multi-instance caching.
            isGlobal: true,
            ttl: 60000,
            max: 100
        }),
        VehiclesModule,
        StateLogModule
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {
}
