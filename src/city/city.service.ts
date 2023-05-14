import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CityEntity } from './entities/city.entity';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllByStateId(stateId: number): Promise<CityEntity[]> {
    const getCities = this.cityRepository.find({ where: { stateId } });

    return this.cacheService.getCache<CityEntity>(
      `stateId_${stateId}`,
      () => getCities,
    );
  }
}
