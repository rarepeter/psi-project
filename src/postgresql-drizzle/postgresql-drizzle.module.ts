import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';

export const DRIZZLE_SQL_PROVIDER_NAME = 'DrizzleSQLProvider';
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE_SQL_PROVIDER_NAME,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const queryClient = postgres(
          config.getOrThrow<string>('POSTGRES_CONNECTION_URI'),
        );

        const db = drizzle(queryClient, {
          // logger: true,
          schema,
        });

        return db;
      },
    },
  ],
  exports: [DRIZZLE_SQL_PROVIDER_NAME],
})
export class PostgresqlDrizzleModule {}
