import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateUrlShortDto {

  @ApiModelProperty({description: 'the redirect url'})
  @IsString()
  readonly url: string;

  @ApiModelPropertyOptional({description: 'user set own shortid'})
  @IsOptional()
  shortId: string;

  @ApiModelPropertyOptional({description: 'user set own shortid', default: false})
  @IsOptional()
  @IsBoolean()
  selfGenerated: boolean;

}