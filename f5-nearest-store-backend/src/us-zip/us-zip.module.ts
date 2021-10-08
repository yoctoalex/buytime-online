import { Module } from '@nestjs/common';
import { UsZipService } from './us-zip.service';
import { UsZipController } from './us-zip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsZip } from './entities/us-zip.entity';
import { ZipLocalCache } from '../local-cache/zip.local-cache';

@Module({
  imports: [TypeOrmModule.forFeature([UsZip])],
  controllers: [UsZipController],
  providers: [UsZipService, ZipLocalCache],
  exports: [ZipLocalCache],
})
export class UsZipModule {}
