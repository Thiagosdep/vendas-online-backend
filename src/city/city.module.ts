import { CacheModule, Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';

const TTL_TEEN_MINUTE = 1000 * 60 * 10;
@Module({
  imports: [
    CacheModule.register({ ttl: TTL_TEEN_MINUTE }),
    TypeOrmModule.forFeature([CityEntity]),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
