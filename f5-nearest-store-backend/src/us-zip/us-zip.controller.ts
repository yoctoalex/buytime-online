import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UsZipService } from './us-zip.service';
import { ZipLocalCache } from '../local-cache/zip.local-cache';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ZipLocationObject } from './objects/zip-location.object';
import { ApiResponse } from '@nestjs/swagger';
import { NearestStoreObject } from '../store-geo-services/objects/nearest-store.object';

@Controller('/api/v2/us-zip')
export class UsZipController {
  constructor(private readonly zipCache: ZipLocalCache) {}

  @Get()
  findAll() {
    return this.zipCache.get();
  }

  @ApiImplicitParam({ name: 'zip', type: String, description: 'Zip Code' })
  @ApiResponse({ type: ZipLocationObject })
  @Get('/:zip')
  async findZip(@Param('zip') zip: string): Promise<ZipLocationObject> {
    const zipCodes = await this.zipCache.get();
    const code = zipCodes.find(
      (x) => x.zip.toLowerCase() === zip.toLowerCase(),
    );
    if (!code) {
      throw new BadRequestException('Not found');
    }
    return {
      lat: code.lat,
      lon: code.lon,
      zip: code.zip,
    };
  }
}
