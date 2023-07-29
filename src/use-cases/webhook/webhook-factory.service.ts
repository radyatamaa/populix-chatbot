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
        return customer;
      }
}
