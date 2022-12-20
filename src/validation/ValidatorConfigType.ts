import {
  IsNotEmpty,
  ValidateIf,
  IsArray,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ValidationConfig {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidationComponent)
  components: ValidationComponent[];
}

class ValidationComponent {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidationParams)
  params: ValidationParams[];
}

class ValidationParams {
  @IsNotEmpty()
  @IsString()
  type: string;

  @ValidateIf((o) => !!o.stringValue)
  @IsString()
  stringValue: string;

  @ValidateIf((o) => !!o.stringListValue)
  @IsArray()
  @IsString({ each: true })
  stringListValue: string[];

  @ValidateIf((o) => o.numberValue !== undefined)
  @IsNumber()
  numberValue: any;
}
