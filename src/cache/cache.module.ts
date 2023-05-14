import { Module, CacheModule as CacheModuleNest } from '@nestjs/common';
import { CacheService } from './cache.service';

const TTL_TEEN_MINUTE = 1000 * 60 * 10;

@Module({
  imports: [CacheModuleNest.register({ ttl: TTL_TEEN_MINUTE })],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
