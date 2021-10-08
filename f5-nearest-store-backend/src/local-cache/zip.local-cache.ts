import { Injectable } from '@nestjs/common';
import { StoreLocation } from '../store-location/entities/store-location.entity';
import { UsZipService } from '../us-zip/us-zip.service';
import { UsZip } from '../us-zip/entities/us-zip.entity';

@Injectable()
export class ZipLocalCache {
  constructor(private uzZipService: UsZipService) {}

  zipCodes: Promise<UsZip[]>;
  private updated: Date;

  get(): Promise<UsZip[]> {
    if (
      !this.updated ||
      new Date().getDate() - this.updated.getDate() >
        (parseFloat(process.env.FREQUENCY) || 24) * 3600 * 1000
    ) {
      this.zipCodes = this.uzZipService.findAll();
      this.updated = new Date();
    }

    return this.zipCodes;
  }
}
