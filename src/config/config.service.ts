import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { ValidationConfig } from '../validation/ValidatorConfigType';
import { type CreatedConfig, type ConfigReturn } from './types';

@Injectable()
export class ConfigService {
  constructor(private prisma: PrismaService) {}

  async createConfig(input: ValidationConfig): Promise<CreatedConfig> {
    const { name, components } = input;
    const config = await this.prisma.config.create({
      data: {
        name,
        components: {
          create: components.map((c) => ({
            type: c.type,
            params: {
              create: c.params.map((p) => ({
                type: p.type,
                ...p,
                stringListValue:
                  p.stringListValue && p.stringListValue.join(','),
              })),
            },
          })),
        },
      },
      include: { components: { include: { params: true } } },
    });

    return config;
  }

  async getConfigs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConfigWhereUniqueInput;
    where?: Prisma.ConfigWhereInput;
    orderBy?: Prisma.ConfigOrderByWithRelationInput;
  }): Promise<ConfigReturn> {
    const { skip, take, cursor, where, orderBy } = params;
    const configs = await this.prisma.config.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { components: { include: { params: true } } },
    });
    return { configs };
  }
}
