import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
  IsDefined,
} from 'class-validator';
import { CatalogCategory } from '../schemas/catalog.schemas';
import { Type } from 'class-transformer';
import { UploadedFile } from '@nestjs/common';

export class CreateCatalogDto {
  @IsEnum(CatalogCategory)
  category: CatalogCategory;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsDefined()
  image: string;
}
