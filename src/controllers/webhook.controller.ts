import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { RequestWebhookDto } from '../core/dtos';

@Controller('api/webhook')
export class WebhookController {
  constructor() {}

  @Get()
  getWebhookConnected(): string {
    return 'webhook connected';
  }

  @Post()
  createAuthor(@Body() requestBody: RequestWebhookDto) {
    console.log(requestBody)
    return true;
  }
}
