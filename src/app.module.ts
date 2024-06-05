import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';
import { BannerImgModule } from './banner-img/banner-img.module';
import { BackCallModule } from './back_call/back_call.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './assets',
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    CatalogModule,
    BannerImgModule,
    BackCallModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
