import { ApiProperty } from '@nestjs/swagger';

export class ZipLocationObject {
  @ApiProperty({ name: 'zip', type: String, description: 'Zip Code' })
  zip: string;

  @ApiProperty({ name: 'lat', type: Number, description: 'Zip latitude' })
  lat: number;

  @ApiProperty({ name: 'lon', type: Number, description: 'Zip longitude' })
  lon: number;
}
