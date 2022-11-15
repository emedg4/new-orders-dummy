import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from "@nestjs/config"
import configuration from './configuration/configuration'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NewOrderModule } from './newOrder/newOrder.module'

@Module({
    imports: [ ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('db.host'),
          port: configService.get<number>('db.port'),
          username: configService.get('db.user'),
          password: configService.get('db.pass'),
          database: configService.get('db.database'),
          autoLoadEntities: true,
          synchronize: true
        })
}),
    NewOrderModule
],
    controllers: [],
    providers: []
})

export class AppModule {}
