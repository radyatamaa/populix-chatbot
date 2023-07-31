import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { WebhookUseCases } from 'src/use-cases/webhook/webhook.use-case';
import { RequestWebhookButtonDto, RequestWebhookTextDto } from '../core/dtos';
import { ApiTags,ApiBody } from '@nestjs/swagger';

@ApiTags('Webhook')
@Controller('api/webhook')
export class WebhookController {
  constructor(private webhookUseCases: WebhookUseCases) {}

  @Get()
  getWebhookConnected(): string {
    return 'webhook connected';
  }

  @ApiBody({type: RequestWebhookTextDto})
  @Post()
  async postWebhook(@Body() requestBody: any) {
    const handle = await this.webhookUseCases.handle(requestBody);
    return true;
  }
}
