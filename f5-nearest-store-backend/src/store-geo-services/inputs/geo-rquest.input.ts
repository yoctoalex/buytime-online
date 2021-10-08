import { ApiProperty } from '@nestjs/swagger';

export class GeoRequestInput {
  @ApiProperty({ name: 'zip', type: String, description: 'Store Zip code' })
  zip: string;
  @ApiProperty({
    name: 'distance',
    type: Number,
    description: 'Radius distance in metres',
  })
  distance: number;
  @ApiProperty({
    name: 'top',
    type: Number,
    description: 'Max number of stores',
  })
  top: number;
}
