import { ApiProperty } from '@nestjs/swagger';

export class NearestStoreObject {
  @ApiProperty({ name: 'title', type: String, description: 'Store title' })
  title: string;

  @ApiProperty({ name: 'address', type: String, description: 'Store address' })
  address: string;

  @ApiProperty({
    name: 'distance',
    type: Number,
    description: 'Distance to store from zip code location',
  })
  distance: number;

  @ApiProperty({ name: 'lat', type: Number, description: 'Store latitude' })
  lat: number;

  @ApiProperty({ name: 'lon', type: Number, description: 'Store longitude' })
  lon: number;
}
