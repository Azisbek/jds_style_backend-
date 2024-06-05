// image.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BannerImg } from './schemas/banner-img.schemas';
import { CreateBannerImgDto } from './dto/create-banner-img.dto';

@Injectable()
export class BannerImgService {
  constructor(
    @InjectModel(BannerImg.name) private readonly imageModel: Model<BannerImg>,
  ) {}

  async saveImagePath(image: string): Promise<BannerImg> {
    const createdImage = new this.imageModel({ image });
    return createdImage.save();
  }

  /////////////////////////////////////////////////////////////////////
  async getImgBanner() {
    return await this.imageModel.find();
  }

  async deleteImgBanner(id: string) {
    const idImgBanner = id;
    if (!idImgBanner) {
      throw new Error('Img not found');
    }
    return await this.imageModel.findByIdAndDelete(idImgBanner);
  }
}
