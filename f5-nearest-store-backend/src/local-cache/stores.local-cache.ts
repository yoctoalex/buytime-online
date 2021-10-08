import { Injectable } from '@nestjs/common';
import { StoreLocation } from '../store-location/entities/store-location.entity';
import { StoreLocationService } from '../store-location/store-location.service';

@Injectable()
export class StoresLocalCache {
  constructor(private storesLocationService: StoreLocationService) {}

  stores: Promise<StoreLocation[]>;
  private updated: Date;

  get(): Promise<StoreLocation[]> {
    if (
      !this.updated ||
      new Date().getDate() - this.updated.getDate() >
        (parseFloat(process.env.FREQUENCY) || 24) * 3600 * 1000
    ) {
      this.stores = this.storesLocationService.findAll();
      this.updated = new Date();
    }

    return this.stores;
  }
}
