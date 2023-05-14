import { Repository } from 'typeorm';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';

import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllByStateId(stateId: number): Promise<CityEntity[]> {
    const citiesCache: CityEntity[] = await this.cacheManager.get(
      String(stateId),
    );

    if (citiesCache) {
      return citiesCache;
    }

    const cities = await this.cityRepository.find({ where: { stateId } });

    await this.cacheManager.set(String(stateId), cities);

    return cities;
  }
}
