import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BackCallService } from './back_call.service';
import { CreateBackCallDto } from './dto/create-back_call.dto';

@Controller('back-call')
export class BackCallController {
  constructor(private readonly backCallService: BackCallService) {}

  @Post('/post')
  post(@Body() createBackCallDto: CreateBackCallDto) {
    return this.backCallService.create(createBackCallDto);
  }

  @Get()
  findAll() {
    return this.backCallService.findAll();
  }

  @Delete(':id/remove')
  delete(@Param('id') id: string) {
    return this.backCallService.deleteById(id);
  }
}
