import { StoreLocationModule } from '../store-location/store-location.module';
import { UsZipModule } from '../us-zip/us-zip.module';
import { Module } from '@nestjs/common';
import { StoreGeoServicesController } from './store-geo-services.controller';

@Module({
  imports: [StoreLocationModule, UsZipModule],
  controllers: [StoreGeoServicesController],
  providers: [],
})
export class StoreGeoServicesModule {}
