import { Injectable } from '@nestjs/common';
import { Customer } from '../../core/entities';
import { RequestWebhookDto } from '../../core/dtos';
import * as moment from 'moment'

@Injectable()
export class WebhookFactoryService {
    async createCustomer(webhook: RequestWebhookDto): Promise<Customer> {
        const customer = new Customer();
        customer.id = 0;
        customer.telegramId = String(webhook.message.from.id);
        customer.firstName = webhook.message.from.first_name;
        customer.lastName = webhook.message.from.last_name;
        customer.userName = webhook.message.from.username;
        customer.locale = webhook.message.from.language_code;
        customer.lastConversation =  moment().format('YYYY-MM-DD HH:mm:ss');
        customer.phoneNumber = '';
        customer.email = '';
        customer.currentFormRealm = '';
        return customer;
      }

      async createWebhookRequestBody(webhook: any): Promise<RequestWebhookDto> {
        if (webhook.callback_query) {
          const webhookBody = new RequestWebhookDto();
          webhookBody.update_id = webhook.update_id;
          webhookBody.message = webhook.callback_query.message;
          webhookBody.message.from = webhook.callback_query.from;
          webhookBody.chat_instance = webhook.callback_query.chat_instance;
          webhookBody.data = webhook.callback_query.data;
          return webhookBody;
        }

        return webhook as RequestWebhookDto;
      }
}
