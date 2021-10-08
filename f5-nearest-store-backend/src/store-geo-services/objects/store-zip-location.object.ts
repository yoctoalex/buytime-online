import { NearestStoreObject } from './nearest-store.object';
import { ZipLocationObject } from '../../us-zip/objects/zip-location.object';
import { ApiProperty } from '@nestjs/swagger';

export class StoreZipLocationObject {
  @ApiProperty({
    name: 'zip',
    type: ZipLocationObject,
    description: 'Zip Info Found',
  })
  zip: ZipLocationObject;

  @ApiProperty({
    name: 'stores',
    type: NearestStoreObject,
    isArray: true,
    description: 'Stores found by location',
  })
  stores: NearestStoreObject[];
}
