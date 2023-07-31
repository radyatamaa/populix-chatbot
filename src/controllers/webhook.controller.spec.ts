import { Test } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookUseCases } from '../use-cases/webhook/webhook.use-case';
import { ChatHistory, Customer, ChatHistoryMessages } from '../core';
import { v4 as uuid } from 'uuid';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import * as moment from 'moment'

const moduleMocker = new ModuleMocker(global);

describe('WebhookController', () => {
  let webhookController: WebhookController;
  let webhookUseCases: WebhookUseCases;
  
  const mockDataResultGetWebhookConnected = "webhook connected"

  const mockDataResultPostWebhook = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [WebhookController],
      })
        .useMocker((token) => {
          if (token === WebhookUseCases) {
            return { 
                handle: jest.fn().mockResolvedValue(mockDataResultPostWebhook),
            };
          }
          if (typeof token === 'function') {
            const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
            const Mock = moduleMocker.generateFromMetadata(mockMetadata);
            return new Mock();
          }
        })
        .compile();

    webhookUseCases = moduleRef.get<WebhookUseCases>(WebhookUseCases);
    webhookController = moduleRef.get<WebhookController>(WebhookController);
  });

  it('getWebhookConnected', async () => {
    expect(await webhookController.getWebhookConnected()).toBe(mockDataResultGetWebhookConnected);
  });

  it('postWebhook', async () => {
    jest.spyOn(webhookUseCases, 'handle').mockImplementation(() => Promise.resolve());
    expect(await webhookController.postWebhook(mockDataResultPostWebhook)).toBe(true);
  });

});