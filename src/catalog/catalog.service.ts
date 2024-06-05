import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Catalog } from './schemas/catalog.schemas';
import mongoose from 'mongoose';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: mongoose.Model<Catalog>,
  ) {}

  createNewCatalog(
    createCatalogDto: CreateCatalogDto,
    filePath: string,
  ): Promise<Catalog> {
    return this.catalogModel.create({ ...createCatalogDto, image: filePath });
  }

  async delete(id: string): Promise<Catalog> {
    const idCatalog = id;
    if (!idCatalog) {
      throw new Error('Catalog not found');
    }
    return this.catalogModel.findByIdAndDelete(idCatalog);
  }

  get(): Promise<Catalog[]> {
    return this.catalogModel.find();
  }

  async getById(id: string): Promise<Catalog> {
    const idCatalog = id;
    if (!idCatalog) {
      throw new Error('Catalog not found');
    }
    return await this.catalogModel.findById(idCatalog);
  }

  //////////////////////////////////////////////////
}
