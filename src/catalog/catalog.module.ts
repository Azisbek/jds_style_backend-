import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogSchema } from './schemas/catalog.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Catalog', schema: CatalogSchema }]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
