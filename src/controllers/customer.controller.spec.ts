import { Test } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerUseCases } from '../use-cases/customer/customer.use-case';
import { ChatHistory, Customer, ChatHistoryMessages } from '../core';
import { v4 as uuid } from 'uuid';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import * as moment from 'moment'

const moduleMocker = new ModuleMocker(global);

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerUseCase: CustomerUseCases;
  
  const mockDataResultGetAllCustomers = [
    {
    id:1,
    firstName:"First Name Cust",
    lastName:"Last Name Cust",
    telegramId:"1231312321"
  } as Customer];

  const mockDataResultGetConversationCustomer = [
    {
        id: uuid(),
        dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        isFromBot: false,
        telegramId: '123123123',
        messages: JSON.stringify({text: 'hello'} as ChatHistoryMessages)
  } as ChatHistory];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CustomerController],
      })
        .useMocker((token) => {
          if (token === CustomerUseCases) {
            return { 
                GetAllCustomers: jest.fn().mockResolvedValue(mockDataResultGetAllCustomers),
                GetConversationCustomer: jest.fn().mockResolvedValue(mockDataResultGetConversationCustomer), 
            };
          }
          if (typeof token === 'function') {
            const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
            const Mock = moduleMocker.generateFromMetadata(mockMetadata);
            return new Mock();
          }
        })
        .compile();

    customerUseCase = moduleRef.get<CustomerUseCases>(CustomerUseCases);
    customerController = moduleRef.get<CustomerController>(CustomerController);
  });

  it('getAll', async () => {
    jest.spyOn(customerUseCase, 'GetAllCustomers').mockImplementation(() => Promise.resolve(mockDataResultGetAllCustomers));
    expect(await customerController.getAll()).toBe(mockDataResultGetAllCustomers);
  });

  it('getConversationCustomer', async () => {
    jest.spyOn(customerUseCase, 'GetConversationCustomer').mockImplementation(() => Promise.resolve(mockDataResultGetConversationCustomer));
    const telegramId = 123123123;
    const limit = 1;
    const offset = 0;
    expect(await customerController.getConversationCustomer(telegramId,limit,offset)).toBe(mockDataResultGetConversationCustomer);
  });

});