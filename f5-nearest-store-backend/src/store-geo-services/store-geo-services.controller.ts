import { NearestStoreObject } from './objects/nearest-store.object';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { StoresLocalCache } from '../local-cache/stores.local-cache';
import { ZipLocalCache } from '../local-cache/zip.local-cache';
import { getDistance } from 'geolib';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { GeoRequestInput } from './inputs/geo-rquest.input';
import { ApiResponse } from '@nestjs/swagger';
import { StoreZipLocationObject } from './objects/store-zip-location.object';
import { ZipLocationObject } from '../us-zip/objects/zip-location.object';

@Controller('/api/v2/geo-services')
export class StoreGeoServicesController {
  constructor(private stores: StoresLocalCache, private zip: ZipLocalCache) {}

  private async getNearestStores(
    zip: string,
    distance: number,
    top: number,
  ): Promise<NearestStoreObject[]> {
    const distanceBoundary = distance;
    const dbZip = await this.zip.get();
    const dbStores = await this.stores.get();
    const code = dbZip.find((x) => x.zip.toLowerCase() === zip.toLowerCase());
    if (!code) {
      throw new BadRequestException('Not found');
    }

    return dbStores
      .reduce((r, store) => {
        const distance = getDistance(
          {
            latitude: store.lat,
            longitude: store.lon,
          },
          {
            latitude: code.lat,
            longitude: code.lon,
          },
        );

        if (distance < distanceBoundary) {
          r.push({
            title: store.title,
            address: store.address,
            distance: distance,
            lat: store.lat,
            lon: store.lon,
          });
        }

        return r;
      }, [] as NearestStoreObject[])
      .sort((a, b) => a.distance - b.distance)
      .slice(0, top);
  }

  @Post('/nearest-store/zip')
  @ApiResponse({ type: NearestStoreObject, isArray: true })
  async findNearestStoresPost(
    @Body() data: GeoRequestInput,
  ): Promise<NearestStoreObject[]> {
    return this.getNearestStores(data.zip, data.distance, data.top);
  }

  @ApiImplicitParam({ name: 'zip', type: String, description: 'Zip Code' })
  @ApiImplicitParam({
    name: 'distance',
    type: Number,
    description: 'Maximum distance in metres',
  })
  @ApiImplicitParam({
    name: 'top',
    type: Number,
    description: 'Maximum items number',
  })
  @ApiResponse({ type: NearestStoreObject, isArray: true })
  @Get('/nearest-store/zip/:zip/:distance/:top')
  async findNearestStoresGet(
    @Param('zip') zip: string,
    @Param('distance') distance: number,
    @Param('top') top: number,
  ): Promise<NearestStoreObject[]> {
    return this.getNearestStores(zip, distance, top);
  }

  @ApiImplicitParam({
    name: 'lat',
    type: Number,
    description: "User's latitude",
  })
  @ApiImplicitParam({
    name: 'lon',
    type: Number,
    description: "User's longitude",
  })
  @ApiResponse({ type: StoreZipLocationObject })
  @Get('/nearest-store/geo/:lat/:lon')
  async findNearestStoresGeo(
    @Param('lat') lat: number,
    @Param('lon') lon: number,
  ): Promise<StoreZipLocationObject> {
    const zipSet = await this.zip.get();
    const allStores = await this.stores.get();
    let nearestStore: { lat: number; lon: number; distance: number } = null;
    allStores.forEach((s) => {
      const d = getDistance(
        {
          latitude: lat,
          longitude: lon,
        },
        {
          latitude: s.lat,
          longitude: s.lon,
        },
      );

      if (!nearestStore || d < nearestStore.distance) {
        nearestStore = {
          lat: s.lat,
          lon: s.lon,
          distance: d,
        };
      }
    });

    let nearestZip: ZipLocationObject = null;
    let distance: number = null;
    zipSet.forEach((z) => {
      const d = getDistance(
        {
          latitude: z.lat,
          longitude: z.lon,
        },
        {
          latitude: nearestStore.lat,
          longitude: nearestStore.lon,
        },
      );

      if (!distance || d < distance) {
        distance = d;
        nearestZip = z;
      }
    });

    const stores = await this.getNearestStores(nearestZip.zip, 20000, 3);

    return {
      zip: nearestZip,
      stores,
    } as StoreZipLocationObject;
  }
}
