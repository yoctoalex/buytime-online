import { Module } from '@nestjs/common';
import { StoreLocationService } from './store-location.service';
import { StoreLocationController } from './store-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreLocation } from './entities/store-location.entity';
import { StoresLocalCache } from '../local-cache/stores.local-cache';

@Module({
  imports: [TypeOrmModule.forFeature([StoreLocation])],
  controllers: [StoreLocationController],
  providers: [StoresLocalCache, StoreLocationService],
  exports: [StoresLocalCache],
})
export class StoreLocationModule {}
