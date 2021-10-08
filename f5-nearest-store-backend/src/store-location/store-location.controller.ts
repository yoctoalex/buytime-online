import { Controller, Get, Param } from '@nestjs/common';
import { StoresLocalCache } from '../local-cache/stores.local-cache';

@Controller('/api/v2/store-location')
export class StoreLocationController {
  constructor(private readonly storeLocationCache: StoresLocalCache) {}

  @Get()
  findAll() {
    return this.storeLocationCache.get();
  }
}
