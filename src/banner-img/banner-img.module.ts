import { Module } from '@nestjs/common';
import { BannerImgController } from './banner-img.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerImgSchemas } from './schemas/banner-img.schemas';
import { BannerImgService } from './banner-img.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BannerImg', schema: BannerImgSchemas },
    ]),
  ],
  controllers: [BannerImgController],
  providers: [BannerImgService],
})
export class BannerImgModule {}
