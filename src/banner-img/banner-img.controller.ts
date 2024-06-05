import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BannerImgService } from './banner-img.service';

import { CreateBannerImgDto } from './dto/create-banner-img.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('banner')
export class BannerImgController {
  constructor(private readonly bannerImgService: BannerImgService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/banner-img/assets',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName} ${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@Res() res, @UploadedFile() file) {
    const filePath = file.path.replace(/\\/g, '/');
    const savedImage = await this.bannerImgService.saveImagePath(filePath);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: savedImage,
    });
  }

  @Get()
  async getImgBanners() {
    return await this.bannerImgService.getImgBanner();
  }

  @Delete(':id/remove')
  async removeImgBanner(@Param('id') id: string) {
    return await this.bannerImgService.deleteImgBanner(id);
  }
}
