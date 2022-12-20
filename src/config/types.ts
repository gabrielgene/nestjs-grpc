import { Component, Config, Params, Prisma } from '@prisma/client';

export type CreatedConfig = Config & {
  components: (Component & {
    params: Params[];
  })[];
};

export type GetParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ConfigWhereUniqueInput;
  where?: Prisma.ConfigWhereInput;
  orderBy?: Prisma.ConfigOrderByWithRelationInput;
};

export type ConfigReturn = {
  configs: Config[];
};
