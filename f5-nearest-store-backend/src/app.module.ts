import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreLocation } from './store-location/entities/store-location.entity';
import { StoreLocationModule } from './store-location/store-location.module';
import { UsZipModule } from './us-zip/us-zip.module';
import { UsZip } from './us-zip/entities/us-zip.entity';
import { StoreGeoServicesModule } from './store-geo-services/store-geo-services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DB || 'storeLocation',
      entities: [StoreLocation, UsZip],
      retryAttempts: Infinity,
    }),
    StoreLocationModule,
    UsZipModule,
    StoreGeoServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
