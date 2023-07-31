import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { CreateAuthorDto, UpdateAuthorDto } from '../core/dtos';
import { CustomerUseCases } from '../use-cases/customer/customer.use-case';

@Controller('api/customer')
export class CustomerController {
  constructor(private customerUseCases: CustomerUseCases) {}

  @Get()
  async getAll() {
    return this.customerUseCases.GetAllCustomers();
  }

  @Get('/conversation/:customer_id')
  async getById(@Param('customer_id') id: number,@Query('limit') limit: number,@Query('offset') offset: number) {
    return this.customerUseCases.GetConversationCustomer(id,limit,offset);
  }
}
