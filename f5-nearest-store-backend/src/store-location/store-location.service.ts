import { Injectable } from '@nestjs/common';
import { StoreLocation } from './entities/store-location.entity';
import { Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreLocationService {
  constructor(
    @InjectRepository(StoreLocation)
    private storeLocationRepository: Repository<StoreLocation>,
  ) {}

  findAll(): Promise<StoreLocation[]> {
    return this.storeLocationRepository.find();
  }
}
