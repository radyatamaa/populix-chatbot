import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { CustomerUseCases } from '../use-cases/customer/customer.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('api/customer')
export class CustomerController {
  constructor(private customerUseCases: CustomerUseCases) {}

  @Get()
  async getAll() {
    return this.customerUseCases.GetAllCustomers();
  }

  @Get('/conversation/:telegram_id')
  async getConversationCustomer(@Param('telegram_id') id: number,@Query('limit') limit: number,@Query('offset') offset: number) {
    return this.customerUseCases.GetConversationCustomer(id,limit,offset);
  }
}
