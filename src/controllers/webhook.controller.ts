import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { WebhookUseCases } from 'src/use-cases/webhook/webhook.use-case';
import { RequestWebhookTextDto } from '../core/dtos';

@Controller('api/webhook')
export class WebhookController {
  constructor(private webhookUseCases: WebhookUseCases) {}

  @Get()
  getWebhookConnected(): string {
    return 'webhook connected';
  }

  @Post()
  async postWebhook(@Body() requestBody: any) {
    const handle = await this.webhookUseCases.handle(requestBody);
    return true;
  }
}
