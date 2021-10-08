import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsZip } from './entities/us-zip.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class UsZipService {
  constructor(
    @InjectRepository(UsZip)
    private usZipRepository: Repository<UsZip>,
  ) {}
  findAll(): Promise<UsZip[]> {
    return this.usZipRepository.find();
  }
}
