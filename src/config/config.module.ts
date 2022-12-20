import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONFIG_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [ConfigController],
  providers: [PrismaService, ConfigService],
})
export class ConfigModule {}
