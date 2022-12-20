import {
  Controller,
  Get,
  Body,
  Post,
  HttpException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Config, Prisma } from '@prisma/client';

import { ValidationConfig } from '../validation/ValidatorConfigType';
import { CreatedConfig, GetParams } from './types';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { ConfigService } from './config.service';

type ConfigReturn = {
  configs: Config[];
};

interface ConfigServiceGRPC {
  getConfigs(params: GetParams): Promise<ConfigReturn>;
  createConfig(input: ValidationConfig): Promise<CreatedConfig>;
}

@Controller('config')
export class ConfigController implements OnModuleInit {
  private configServiceGRPC: ConfigServiceGRPC;

  constructor(
    @Inject('CONFIG_PACKAGE') private readonly client: ClientGrpc,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.configServiceGRPC =
      this.client.getService<ConfigServiceGRPC>('ConfigService');
  }

  @Get()
  configs(): Promise<ConfigReturn> {
    return this.configServiceGRPC.getConfigs({});
  }

  @Post()
  async create(
    @Body()
    postData: ValidationConfig,
  ): Promise<CreatedConfig | HttpException> {
    return this.configServiceGRPC.createConfig(postData);
  }

  @GrpcMethod('ConfigService', 'GetConfigs')
  async getConfigs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConfigWhereUniqueInput;
    where?: Prisma.ConfigWhereInput;
    orderBy?: Prisma.ConfigOrderByWithRelationInput;
  }): Promise<ConfigReturn> {
    return this.configService.getConfigs(params);
  }

  @GrpcMethod('ConfigService', 'CreateConfig')
  async createConfig(input: ValidationConfig): Promise<CreatedConfig> {
    return this.configService.createConfig(input);
  }
}
