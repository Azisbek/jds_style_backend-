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
  UseGuards,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './schemas/catalog.schemas';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('/post')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/catalog/assets',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async postCatalog(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateCatalogDto,
  ): Promise<Catalog> {
    // const filePath = file.path.replace(/\\/g, '/');
    const filePath = `/assets/${file.filename}`;

    const newCatalog = await this.catalogService.createNewCatalog(
      createDto,
      filePath,
    );
    return res.status(HttpStatus.OK).json({
      success: true,
      data: newCatalog,
    });
  }

  @Delete(':id/remove')
  removeCatalog(@Param('id') id: string): Promise<Catalog> {
    return this.catalogService.delete(id);
  }

  @Get()
  getAllCatalog(): Promise<Catalog[]> {
    return this.catalogService.get();
  }

  @Get(':id')
  getCatalogById(@Param('id') id: string): Promise<Catalog> {
    return this.catalogService.getById(id);
  }
}
