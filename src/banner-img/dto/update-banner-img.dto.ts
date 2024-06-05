import { PartialType } from '@nestjs/mapped-types';
import { CreateBannerImgDto } from './create-banner-img.dto';

export class UpdateBannerImgDto extends PartialType(CreateBannerImgDto) {}
